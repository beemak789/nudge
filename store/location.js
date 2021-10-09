import { firebase } from '../config/firebase';
const SET_LOCATION = 'SET_LOCATION'


export const setBackgroundLocation = (location) => {
  return {
    type: SET_LOCATION,
    location,
  };
};

export default (state = {location: {}}, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {location: action.location};
    default:
      return state;
  }
};
