import { firebase } from '../config/firebase';

const SEND_MESSAGE = "SEND_MESSAGE"
const SET_GROUP_CHAT = "SET_GROUP_CHAT"

const sendMessage = (message) => {
  return {
    type: SEND_MESSAGE,
    message
  }
}

const setGroupChat = (messages) => {
  return {
    type: SET_GROUP_CHAT,
    messages
  }
}

export const _sendMessage = ( groupId, message, name) => {
  return async (dispatch) => {
    try {
      //adds to messages array in firestore with newest message
      await firebase
      .firestore()
      .collection('groups')
      .doc(groupId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({message,
          name,
          timestamp: Date.now()
        }),
      })
      dispatch(fetchGroupChat(groupId))
    }catch(err){
      console.log(err)
    }
  }
}

export const fetchGroupChat = (groupId) =>{
  return async(dispatch) => {
    try{
      let messages = []
      await firebase
      .firestore()
      .collection('groups')
      .doc(groupId)
      .onSnapshot(async (snapshot) => {
        messages = snapshot.data().messages;
        dispatch(setGroupChat(messages))
      })
    } catch(err){

    }
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.message]
    case SET_GROUP_CHAT:
      return [...action.messages]
    default:
      return state;
  }
}
