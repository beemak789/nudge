const SET_LOCATION = 'SET_LOCATION';

export const setBackgroundLocation = (location) => {
  return {
    type: SET_LOCATION,
    location,
  };
};

export const checkLocation = (currLocation, currLat, currLng) => {
  return async (dispatch) => {
    try {
      const { location } = getState();
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
        dispatch(_highPriorityFetchPlaces(currLat, currLng));
      }

      dispatch(setBackgroundLocation(currLocation));
    } catch (error) {
      console.log(error);
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