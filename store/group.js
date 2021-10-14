import { firebase } from '../config/firebase';

//reference to the "groups" collection in Firestore
const groupsRef = firebase.firestore().collection('groups');

const CREATE_GROUP = 'CREATE_GROUP';
const SET_GROUPS = 'SET_GROUPS';

export const _setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    groups,
  };
};
export const _createGroup = (group) => {
  return {
    type: CREATE_GROUP,
    group,
  };
};
export const fetchAllGroups = () => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('groups')
        .get()
        .then((snapshot) => {
          let groups = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch(_setGroups(groups));
        });
    } catch (err) {
      console.log(err);
    }
  };
};
export const createGroup = ({ name, members}) => {
  return async (dispatch) => {
    try {
      const data = {
        name,
        members
      };
      let id = await firebase
        .firestore()
        .collection('groups')
        .add(data)
        .then((result) => {
          return result.id;
        });
      dispatch(
        _createGroup({
          name,
          members,
          id
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  groups: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return { ...state, groups: [...state.groups, action.group] };
    case SET_GROUPS:
      return { ...state, groups: action.groups };
    default:
      return state;
  }
};
