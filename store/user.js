const SET_USER = 'SET_USER';

export const setUser = () => {
  return {
    type: SET_USER,
    user,
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};
