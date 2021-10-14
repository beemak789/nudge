import { firebase } from '../config/firebase';
const SET_USER = 'SET_USER';
const SET_USER_FRIENDS = 'SET_USER_FRIENDS';
const SET_EXPO_PUSH_TOKEN = 'SET_EXPO_PUSH_TOKEN';
const ADD_FRIEND = 'ADD_FRIEND';
const LOGOUT_USER = 'LOGOUT_USER'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUser = (user) => {
  console.log(user)
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
      console.log('I AM HERE)')
      console.log(user.token)
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

export const _fetchUserFriends = (user) => {
  return async (dispatch) => {
    try {
      const { fullName, email, id } = user;
      const tasks = await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .get()
        .then((snapshot) => {
          let userFriends = snapshot.data().friends
          dispatch(setUserFriends(userFriends))
        });
    } catch (err) {
      alert(err);
    }
  };
};

export const _addFriend = (user, friend) => {
  return async (dispatch) => {
    try {
      console.log('***', friend.id)
      await firebase
      .firestore()
      .collection('users')
      .doc(user.id)
      .update({friends: firebase.firestore.FieldValue.arrayUnion(friend)})

      await firebase
      .firestore()
      .collection('users')
      .doc(friend.id)
      .update({friends: firebase.firestore.FieldValue.arrayUnion(user)})

      dispatch(addFriend(friend))
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
