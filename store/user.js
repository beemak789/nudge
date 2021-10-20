import { firebase } from '../config/firebase';
import { clearPlaces } from './places';
import { clearCurrTask } from './task';
const SET_USER = 'SET_USER';
const SET_USER_FRIENDS = 'SET_USER_FRIENDS';
const SET_EXPO_PUSH_TOKEN = 'SET_EXPO_PUSH_TOKEN';
const SET_EXPO_NOTIFICATION_STATUS = 'SET_EXPO_NOTIFICATION_STATUS';
const SET_EXPO_LOCATION_STATUS = 'SET_EXPO_LOCATION_STATUS';
const SET_BADGE_COUNT = 'SET_BADGE_COUNT';
const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
const SET_USER_PENDING_FRIENDS = 'SET_USER_PENDING_FRIENDS';
const ADD_FRIEND = 'ADD_FRIEND';
const DELETE_FRIEND = 'DELETE_FRIEND';
const LOGOUT_USER = 'LOGOUT_USER';
const DELETE_USER_GROUP = 'DELETE_USER_GROUP';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const setUserFriends = (friends) => {
  return {
    type: SET_USER_FRIENDS,
    friends,
  };
};

export const setUserPendingFriends = (pendingFriends) => {
  return {
    type: SET_USER_PENDING_FRIENDS,
    pendingFriends,
  };
};

export const addFriend = (friend, friendId) => {
  return {
    type: ADD_FRIEND,
    friend,
    friendId,
  };
};

export const addFriendRequest = (friendRequest) => {
  return {
    type: ADD_FRIEND_REQUEST,
    friendRequest,
  };
};

export const deleteUserGroup = (groupId) => {
  return {
    type: DELETE_USER_GROUP,
    groupId,
  };
};
// USER NOTIFICATIONS
export const setExpoPushToken = (token) => {
  return {
    type: SET_EXPO_PUSH_TOKEN,
    token,
  };
};

//Set Notification Status to "ON" or "OFF"
export const setExpoNotificationStatus = (status) => {
  return {
    type: SET_EXPO_NOTIFICATION_STATUS,
    status,
  };
};

export const setExpoLocationStatus = (locationStatus) => {
  return {
    type: SET_EXPO_LOCATION_STATUS,
    locationStatus,
  };
};

//BADGE COUNT
export const setBadgeCount = (badgeCount) => {
  return {
    type: SET_BADGE_COUNT,
    badgeCount,
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
                alert('User does not exist.');
                return;
              }
              const data = firestoreDocument.data();
              dispatch(setUser(data));
              _fetchUserFriends(uid);
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
        token: user.token,
      });
    } catch (err) {
      alert(err);
    }
  };
};

// NOTIFICATIONS
export const enableNotifications = (user) => {
  return async (dispatch) => {
    try {
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(user.id).update({
        allowNotifications: true,
      });
      dispatch(setExpoNotificationStatus(true));
    } catch (err) {
      alert(err);
    }
  };
};

export const disableNotifications = (user) => {
  return async (dispatch) => {
    try {
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(user.id).update({
        allowNotifications: false,
      });
      dispatch(setExpoNotificationStatus(false));
    } catch (err) {
      alert(err);
    }
  };
};

//Badge Count
export const updateBadgeCount = (user) => {
  return async (dispatch) => {
    try {
      const { badgeCount } = user;
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(user.id).update({
        badgeCount: firebase.firestore.FieldValue.increment(1),
      });
      dispatch(setBadgeCount(badgeCount + 1));
    } catch (err) {
      alert(err);
    }
  };
};

export const _fetchUserPendingFriends = (user) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .get()
        .then(async (friendsList) => {
          let userPendingFriends = friendsList.data().pendingFriends;
          let result = await Promise.all(
            userPendingFriends.map(
              async (friend) => await _fetchSingleFriendInfo(friend)
            )
          );
          dispatch(setUserPendingFriends(result));
        });
    } catch (err) {
      alert(err);
    }
  };
};

export const _fetchUserFriends = (user) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .get()
        .then(async (friendsList) => {
          let userFriends = friendsList.data().friends;
          let result = await Promise.all(
            userFriends.map(
              async (friend) => await _fetchSingleFriendInfo(friend)
            )
          );
          dispatch(setUserFriends(result));
        });
    } catch (err) {
      alert(err);
    }
  };
};

export const _fetchSingleFriendInfo = async (friendId) => {
  let userInfo;
  await firebase
    .firestore()
    .collection('users')
    .doc(friendId)
    .get()
    .then((snapshot) => {
      userInfo = snapshot.data();
      if (userInfo.friends) {
        delete userInfo.friends;
      }
    });
  return userInfo;
};

export const _addFriend = (userId, friendId) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(friendId),
          pendingFriends: firebase.firestore.FieldValue.arrayRemove(friendId),
        });
      await firebase
        .firestore()
        .collection('users')
        .doc(friendId)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(userId),
          friendRequests: firebase.firestore.FieldValue.arrayRemove(userId),
        });
      const friendInfoForState = await _fetchSingleFriendInfo(friendId);
      dispatch(addFriend(friendInfoForState, friendId));
    } catch (err) {
      alert(err);
    }
  };
};

export const _addPendingFriend = (userId, friendId) => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .update({
          friendRequests: firebase.firestore.FieldValue.arrayUnion(friendId),
        });
      await firebase
        .firestore()
        .collection('users')
        .doc(friendId)
        .update({
          pendingFriends: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      const friendInfoForState = await _fetchSingleFriendInfo(friendId);
      dispatch(addFriendRequest(friendInfoForState));
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
        .update({
          friends: firebase.firestore.FieldValue.arrayRemove(friendId),
        });

      await firebase
        .firestore()
        .collection('users')
        .doc(friendId)
        .update({ friends: firebase.firestore.FieldValue.arrayRemove(userId) });

      dispatch(deleteFriend(friendId));
    } catch (err) {
      alert(err);
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    try {
      await firebase
        .auth()
        .signOut()
        .catch(function (error) {
          console.log(error);
        });
      dispatch(logoutUser());
      dispatch(clearPlaces());
      dispatch(clearCurrTask());
    } catch (err) {
      console.log(err);
    }
  };
};

export const signUpUser = (email, password, first, last) => {
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
            fullName: first + ' ' + last,
            pendingFriends: [],
            friendRequests: [],
            friends: [],
            locationStatus: true,
            badgeCount: 0,
            groups: [],
            allowNotifications: true,
            token: '',
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

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.user };
    case SET_EXPO_PUSH_TOKEN:
      return { ...state, token: action.token };
    case SET_EXPO_NOTIFICATION_STATUS:
      return { ...state, allowNotifications: action.status };
    case SET_USER_FRIENDS:
      return { ...state, friends: action.friends };
    case SET_USER_PENDING_FRIENDS:
      return { ...state, pendingFriends: action.pendingFriends };
    case SET_EXPO_LOCATION_STATUS:
      return { ...state, locationStatus: action.locationStatus };
    case SET_BADGE_COUNT:
      return { ...state, badgeCount: action.badgeCount };
    case LOGOUT_USER:
      return {};
    case DELETE_FRIEND:
      const deleteFriend = [...state.friends].filter(
        (friend) => friend.id !== action.friendId
      );
      return { ...state, friends: deleteFriend };
    case DELETE_USER_GROUP:
      const deleteGroup = [...state.groups].filter(
        (group) => group.id !== action.groupId
      );
      return { ...state, groups: deleteGroup };
    case ADD_FRIEND:
      const newFriends = [...state.friends];
      if (!state.friends.includes(action.friend)) {
        newFriends.push(action.friend);
      }
      const deletedPending = [...state.pendingFriends].filter(
        (friend) => friend.id !== action.friendId
      );
      return { ...state, friends: newFriends, pendingFriends: deletedPending };
    case ADD_FRIEND_REQUEST:
      return {
        ...state,
        friendRequests: [...state.friendRequests, action.friendRequest],
      };
    default:
      return state;
  }
};
