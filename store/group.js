import { firebase } from '../config/firebase';

const SET_GROUPS = 'SET_GROUPS';
const ADD_GROUP = 'CREATE_GROUP';
const SELECT_GROUP = 'SELECT_GROUP';
const DELETE_GROUP = ''

export const _setGroups = (groups) => {
  return {
    type: SET_GROUPS,
    groups,
  };
};
export const _addGroup = (group) => {
  return {
    type: ADD_GROUP,
    group,
  };
};

export const _selectGroup = (selectedGroup) => {
  return {
    type: SELECT_GROUP,
    selectedGroup,
  };
};

//should return a list of groups that user is part of
export const fetchUserGroups = () => {
  return async (dispatch) => {
    try {
      //this is the user we want to fetch groups for
      let groupsArray = []
      let arrayOfIds = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            groupsArray = snapshot.data().groups
            })
            // console.log("USER GROUPS IN REDUX", userGroups)
            //  dispatch(_setGroups(userGroups))

      //map through their array of groupIDs and find the group objects in firestore
      let groupsArrayInfo = []
      let userGroups = await Promise.all(groupsArray.map(async(group)=> {
           await firebase
            .firestore()
            .collection('groups')
            .doc(group)
            .get()
            .then((snapshot) => {
              groupsArrayInfo.push({...snapshot.data(), id: group})
              return snapshot.data()
              dispatch(_setGroups(groupsArrayInfo))
            })

          })
      )}
      catch (err) {
        console.log(err);
    }
  }
}

export const createGroup = ({ name, members}) => {
  return async (dispatch) => {
    try {
      const data = {
        name,
        members
      };
      // returns id of newly created group
      let groupId = await firebase
        .firestore()
        .collection('groups')
        .add(data)
        .then((result) => {
          return result.id;
        });
      // adds the new groupID to each members' groups array on their user object
      members.forEach(async (member) =>
      await firebase
      .firestore()
      .collection('users')
      .doc(member.id)
      .update({groups: firebase.firestore.FieldValue.arrayUnion(groupId)})
      )
      //adds the new group to the redux store
      dispatch(
        _addGroup({
          name,
          members,
          groupId
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectGroup = (groupId) => {
  return async (dispatch) => {
    try {
      //fetch the group from firestore
      let selectedGroup = await firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .get()
      //set the retrieved object to the selectedGroup key on redux state
        dispatch(_selectGroup(selectedGroup));
      }
       catch (err) {
        console.log(err);
    }
  };
};

const initialState = {
  groups: [],
  selectedGroup: {}
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, groups: action.groups };
    case ADD_GROUP:
      return { ...state, groups: [...state.groups, action.group] };
    case DELETE_GROUP:
      return {}
    case SELECT_GROUP:
      return {...state, selectedGroup: action.selectedGroup}
    default:
      return state;
  }
};
