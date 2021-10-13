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
export const _fetchAllGroups = () => {
  return async (dispatch) => {
    try {
      await firebase
        .firestore()
        .collection('groups')
        .doc(firebase.auth().currentUser.uid)
        .collection('userGroups')
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
export const createGroup = ({ name, members, tasks = [] }) => {
  return async (dispatch) => {
    try {
      const data = {
        name,
        members,
        tasks
      };
      let id = await firebase
        .firestore()
        .collection('groups')
        .doc(firebase.auth().currentUser.uid)
        .collection('userGroups')
        .add(data)
        .then((result) => {
          return result.id;
        });
      dispatch(
        _createGroup({
          name,
          members,
          tasks,
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
      return { ...state, groups: action.group };
    case SET_GROUPS:
      return { ...state, groups: action.groups };
    default:
      return state;
  }
};
