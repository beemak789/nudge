import { firebase } from '../config/firebase';
const SET_USER = 'SET_USER';
const SET_USER_FRIENDS = 'SET_USER_FRIENDS';
const SET_EXPO_PUSH_TOKEN = 'SET_EXPO_PUSH_TOKEN';

const ADD_FRIEND = 'ADD_FRIEND';
const DELETE_FRIEND = 'DELETE_FRIEND';
const LOGOUT_USER = 'LOGOUT_USER'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: SET_USER,
  };
};

export const setUserFriends = (friends) => {
  return {
    type: SET_USER_FRIENDS,
    friends,
  };
};

export const addFriend = (friend) => {
  return {
    type: ADD_FRIEND,
    friend,
  };
};

export const deleteFriend = (friendId) => {
  return {
    type: DELETE_FRIEND,
    friendId,
  };
};

export const logInUser = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (response) => {
          const uid = response.user.uid;
          const usersRef = firebase.firestore().collection('users');
          usersRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                alert('User does not exist anymore.');
                return;
              }
              const data = firestoreDocument.data();
              dispatch(setUser(data));
              _fetchUserFriends(uid)
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
    } catch (err) {
      console.log(err);
    }
  };
};

// export const listenToUser = (uid) => {
//   return async (dispatch) => {
//     try {
//       const usersRef = firebase.firestore().collection('users');
//       await usersRef
//         .doc(uid)
//         .onSnapshot()
//         .catch(function (error) {
//           console.log(error);
//         });

//       dispatch(setUser({}));
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const fetchUpdatedUser = (user) => {
  return async (dispatch) => {
    try {
      const { fullName, email, id } = user;
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(id).update({
        fullName,
        email,
      });
      dispatch(setUser(user));
    } catch (err) {
      alert(err);
    }
  };
};

export const _setExpoPushToken = (user) => {
  return async (dispatch) => {
    try {
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(user.id).update({
        token: user.token
      });
      // dispatch(setExpoPushToken(token));
    } catch (err) {
      alert(err);
    }
  };
};

export const _fetchUserFriends = (userId) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .get()
        .then(async (friendsList) => {
          let userFriends = friendsList.data().friends;
          let result = await Promise.all(userFriends.map(async (friend) => await _fetchSingleFriendInfo(friend)))
          dispatch(setUserFriends(result))
      })
    } catch (err) {
      alert(err);
    }
  };
};

export const _fetchSingleFriendInfo = async (friendId) => {
  let userInfo
  await firebase
    .firestore()
    .collection('users')
    .doc(friendId)
    .get()
    .then( (snapshot) => {
      userInfo = snapshot.data()
      if(userInfo.friends) {
        delete userInfo.friends
      }
  })
  return userInfo
};

export const _addFriend = (userId, friendId) => {
  return async (dispatch) => {
    try {
      await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({friends: firebase.firestore.FieldValue.arrayUnion(friendId)})
      // add two way friendship
      await firebase
      .firestore()
      .collection('users')
      .doc(friendId)
      .update({friends: firebase.firestore.FieldValue.arrayUnion(userId)})

      const friendInfoForState = await _fetchSingleFriendInfo(friendId)
      dispatch(addFriend(friendInfoForState))
    } catch (err) {
      alert(err);
    }
  };
};


export const _deleteFriend = (userId, friendId) => {
  return async (dispatch) => {
    try {

      await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({friends: firebase.firestore.FieldValue.arrayRemove(friendId)})

      await firebase
      .firestore()
      .collection('users')
      .doc(friendId)
      .update({friends: firebase.firestore.FieldValue.arrayRemove(userId)})

      dispatch(deleteFriend(friendId))
    } catch (err) {
      alert(err);
    }
  };
};

export const logOutUser = () => {
  console.log('logout')
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signOut()
        .catch(function (error) {
          console.log(error);
        });
      dispatch(logoutUser());
    } catch (err) {
      console.log(err);
    }
  };
};

export const signUpUser = (email, password, first, last, location) => {
  return async (dispatch) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (response) => {
          const uid = response.user.uid;
          await AsyncStorage.setItem('USER_ID', uid);
          const data = {
            id: uid,
            email,
            fullName: first + last,
            lat: location.coords.latitude,
            long: location.coords.longitude,
          };

          const usersRef = firebase.firestore().collection('users');

          usersRef
            .doc(uid)
            .set(data)
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          alert(error);
        });
      dispatch(setUser(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const setExpoPushToken = (token) => {
  return {
    type: SET_EXPO_PUSH_TOKEN,
    token,
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.user };
    case SET_EXPO_PUSH_TOKEN:
      return { ...state, token: action.token};
    case SET_USER_FRIENDS:
        return { ...state, friends: action.friends };
    case LOGOUT_USER:
      return {};
    case DELETE_FRIEND:
      const deleteFriend = [...state.friends].filter( (friend) => friend.id !== action.friendId)
      return { ...state, friends: deleteFriend };
    case ADD_FRIEND:
      const newFriends = [...state.friends]
      if(!state.friends.includes(action.friend)){
        newFriends.push(action.friend)
      }
      return { ...state, friends: newFriends };
    default:
      return state;
  }
};
