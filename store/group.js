import { firebase } from '../config/firebase';
import { _fetchSingleFriendInfo } from './user';

const SET_GROUPS = 'SET_GROUPS';
const EDIT_GROUP_NAME = 'EDIT_GROUP_NAME';
const ADD_GROUP_MEMBERS = 'ADD_GROUP_MEMBERS';
const ADD_GROUP = 'ADD_GROUP';
const SELECT_GROUP = 'SELECT_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';
const CLEAR_GROUPS = 'CLEAR_GROUPS';
const SET_GROUP_MEMBERS = 'SET_GROUP_MEMBERS';

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

export const editGroupName = (name, groupId) => {
  return {
    type: EDIT_GROUP_NAME,
    name,
    groupId,
  };
};

export const addGroupMembers = (members, groupId) => {
  return {
    type: ADD_GROUP_MEMBERS,
    members,
    groupId,
  };
};

export const _selectGroup = (selectedGroup) => {
  return {
    type: SELECT_GROUP,
    selectedGroup,
  };
};

export const _deleteGroup = (groupId) => {
  return {
    type: DELETE_GROUP,
    groupId,
  };
};

export const setGroupMembers = (members) => {
  return {
    type: SET_GROUP_MEMBERS,
    members,
  };
};

export const clearGroups = () => {
  return {
    type: CLEAR_GROUPS,
    groups: [],
    selectedGroup: {
      id: '',
      group: {},
      members: [],
    },
  };
};

function compareValues(key, order = 'asc') {
  //called within sort function, gives a number value to each of our objects based on key comparisons
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    //if key is string, change to all uppercase, otherwise can leave as is
    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
    //set the comparison value to either 1, -1, or 0 based on key comparison, 0 means leave in place
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      //invert the return value if want descending order
      order === 'desc' ? comparison * -1 : comparison
    );
  };
}
export const fetchUserGroups = (user) => {
  return async (dispatch) => {
    try {
      let groupsArray = [];
      let arrayOfIds = await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .onSnapshot(async (snapshot) => {
          groupsArray = snapshot.data().groups;
          let groupsArrayInfo = [];
          let userGroups = await Promise.all(
            groupsArray.map(async (group) => {
              await firebase
                .firestore()
                .collection('groups')
                .doc(group)
                .get()
                .then((snapshot) => {
                  let groupInfo = snapshot.data();
                  if (groupInfo.members.length < 2) {
                    delete snapshot.data();
                  } else {
                    groupsArrayInfo.push({ ...groupInfo, id: group });
                  }
                  return groupInfo;
                });
            })
          );
          groupsArrayInfo.sort(compareValues('name'));
          dispatch(_setGroups(groupsArrayInfo));
        });
    } catch (err) {
      console.log(err);
    }
  };
};
export const createGroup = ({ name, members }) => {
  return async (dispatch) => {
    try {
      const data = {
        name,
        members,
        messages: [],
      };

      let groupId = await firebase
        .firestore()
        .collection('groups')
        .add(data)
        .then((result) => {
          return result.id;
        });

      members.forEach(
        async (memberId) =>
          await firebase
            .firestore()
            .collection('users')
            .doc(memberId)
            .update({
              groups: firebase.firestore.FieldValue.arrayUnion(groupId),
            })
      );
      const group = {
        name,
        members,
        groupId,
      };

      dispatch(
        _addGroup({
          name,
          members,
          groupId,
        })
      );

      dispatch(_selectGroup({ group: group, id: groupId }));
    } catch (err) {
      console.log(err);
    }
  };
};

export const _editGroup = ({ groupId, name, members }) => {
  return async (dispatch, getState) => {
    try {
      const { groups } = getState();

      if (groups.selectedGroup.group.name !== name) {
        let updatedName = await firebase
          .firestore()
          .collection('groups')
          .doc(groupId)
          .update({
            name: name,
          })
          .then(() => dispatch(editGroupName(name, groupId)));
      }

      if (members.length) {
        members.forEach(
          async (member) =>
            await firebase
              .firestore()
              .collection('groups')
              .doc(groupId)
              .update({
                members: firebase.firestore.FieldValue.arrayUnion(member.id),
              })
        );

        members.forEach(
          async (member) =>
            await firebase
              .firestore()
              .collection('users')
              .doc(member.id)
              .update({
                groups: firebase.firestore.FieldValue.arrayUnion(groupId),
              })
        );
        dispatch(addGroupMembers(members, groupId));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteGroup = (groupId, members) => {
  return async (dispatch) => {
    try {
      let group = await firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .delete();
      members.map(
        async (memberId) =>
          await firebase
            .firestore()
            .collection('users')
            .doc(memberId)
            .update({
              groups: firebase.firestore.FieldValue.arrayRemove(groupId),
            })
      );
      dispatch(_deleteGroup(groupId));
    } catch (err) {
      console.log(err);
    }
  };
};

export const leaveGroup = (groupId) => {
  return async (getState) => {
    try {
      const { user } = getState();
      // delete the group id from your user
      let group = await firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .update({
          members: firebase.firestore.FieldValue.arrayRemove(user.id),
        });

      let updatedUser = await firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .update({
          groups: firebase.firestore.FieldValue.arrayRemove(groupId),
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const _fetchGroupMembers = (memberIds) => {
  return async (dispatch) => {
    try {
      let groupMembers = await Promise.all(
        memberIds.map(
          async (memberId) => await _fetchSingleFriendInfo(memberId)
        )
      );

      dispatch(setGroupMembers(groupMembers));
    } catch (err) {
      console.log(err);
    }
  };
};

export const selectGroup = (groupId) => {
  return async (dispatch) => {
    try {
      let selectedGroup = await firebase
        .firestore()
        .collection('groups')
        .doc(groupId)
        .get()
        .then((snapshot) => {
          let group = snapshot.data();

          dispatch(_selectGroup({ group: group, id: groupId }));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  groups: [],
  selectedGroup: {
    id: '',
    group: {},
    members: [],
  },
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, groups: action.groups };
    case ADD_GROUP:
      return { ...state, groups: [...state.groups, action.group] };
    case EDIT_GROUP_NAME:
      const updatedGroups = state.groups.map((group) => {
        if (group.id === action.groupId) {
          group.name = action.name;
        }
        return group;
      });

      const selected = { ...state.selectedGroup.group };
      selected.name = action.name;
      const updatedSelected = { ...state.selectedGroup };
      updatedSelected.group = selected;

      return {
        ...state,
        groups: updatedGroups,
        selectedGroup: updatedSelected,
      };

    case ADD_GROUP_MEMBERS:
      const addMembers = [...state.selectedGroup.members];
      addMembers.push(...action.members);

      const updatedSelectedGroup = { ...state.selectedGroup };
      updatedSelectedGroup.members = addMembers;

      return {
        ...state,
        selectedGroup: updatedSelectedGroup,
      };
    case DELETE_GROUP:
      const deletedGroups = state.groups.filter(
        (group) => group.id !== action.groupId
      );

      const deletedGroup =
        action.groupId === state.selectedGroup.id
          ? { id: '', group: {}, members: [] }
          : state.selectedGroup;

      return {
        ...state,
        groups: deletedGroups,
        selectedGroup: deletedGroup,
      };
    case SELECT_GROUP:
      return {
        ...state,
        selectedGroup: {
          members: action.selectedGroup.members,
          id: action.selectedGroup.id,
          group: action.selectedGroup.group,
          messages: action.selectedGroup.messages,
        },
      };
    case SET_GROUP_MEMBERS:
      return {
        ...state,
        selectedGroup: {
          members: action.members,
          id: state.selectedGroup.id,
          group: state.selectedGroup.group,
          messages: action.messages,
        },
      };
    case CLEAR_GROUPS:
      return {
        groups: action.groups,
        selectedGroup: action.selectedGroup,
      };
    default:
      return state;
  }
};
