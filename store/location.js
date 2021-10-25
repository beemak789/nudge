import { firebase } from '../config/firebase';
import * as Location from 'expo-location';
import { setExpoLocationStatus } from './user';
const SET_LOCATION = 'SET_LOCATION';

export const setBackgroundLocation = (location) => {
  return {
    type: SET_LOCATION,
    location,
  };
};

export const checkLocation = (currLocation, currLat, currLng) => {
  return async (dispatch, getState) => {
    try {
      const { location } = getState();

      if (location.coords) {
        const prevLat = location.coords.latitude;
        const prevLng = location.coords.longitude;

        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }

        function getDistance(lat1, lon1, lat2, lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad above
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c * 1000; // Distance in m
          return d;
        }

        const distance = getDistance(prevLat, prevLng, currLat, currLng);

        if (distance >= 1000) {
          // do something
        }
      }

      dispatch(setBackgroundLocation(currLocation));
    } catch (error) {
      console.log(error);
    }
  };
};

//LOCATION STATUS
export const enableLocation = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      let location = await Location.getCurrentPositionAsync({});
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(user.id).update({
        locationStatus: true,
      });

      dispatch(
        checkLocation(
          location,
          location.coords.latitude,
          location.coords.longitude
        )
      );
      dispatch(setExpoLocationStatus(true));
    } catch (err) {
      alert(err);
    }
  };
};

export const disableLocation = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      const userRef = firebase.firestore().collection('users');
      const res = await userRef.doc(user.id).update({
        locationStatus: false,
      });
      dispatch(setExpoLocationStatus(false));
    } catch (err) {
      alert(err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return action.location;
    default:
      return state;
  }
};
