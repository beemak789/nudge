import { firebase } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

//reference to the "tasks" collection in Firestore
const tasksRef = firebase.firestore().collection('tasks');

const SET_ALL_TASKS = 'SET_ALL_TASKS';
const CLEAR_ALL_TASKS = 'CLEAR_ALL_TASKS';

export const setAllTasks = (tasks) => {
  return {
    type: SET_ALL_TASKS,
    tasks,
  };
};

export const clearAllTasks = () => {
  return {
    type: CLEAR_ALL_TASKS,
    tasks: [],
  };
};

// get all tasks (not for specific user)
// export const _fetchAllTasks = () => {
//   return async (dispatch) => {
//     try {
//       const userId = await AsyncStorage.getItem('USER_ID');
//       const res = await tasksRef.get();
//       const taskId = res.docs.map((doc) => doc.id); // Array of id: string
//       const taskInstances = res.docs.map((doc) => doc.data()); // Array of {name: string, priority: string, category: string}
//       console.log('this is the response---->', taskInstances);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

export const _fetchAllTasks = () => {
  return async (dispatch) => {
    try {
      firebase
        .firestore()
        .collection('tasks')
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .orderBy('priority')
        .get()
        .then((snapshot) => {
          let tasks = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          dispatch(setTasks(tasks));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const _createTask = () => {
  return async (dispatch) => {
    try {
      const data = {
        name: 'CHOCOLATE',
        priority: 'HIGH',
        category: 'GROCERIES',
      };

      firebase
        .firestore()
        .collection('tasks')
        .doc(firebase.auth().currentUser.uid)
        .set(data);
    } catch (err) {
      console.log(err);
    }
  };
};

const _updateTask = (taskId) => {
  return async (dispatch) => {
    try {
      const res = await tasksRef.doc(taskId).update({
        name: 'cookies',
        priority: 'low',
      });
    } catch (err) {
      console.log(err);
    }
  };
};

const _deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      const res = await tasksRef.doc(taskId).delete();
    } catch (err) {
      console.log(err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_ALL_TASKS:
      return action.tasks;
    case CLEAR_ALL_TASKS:
      return action.tasks;
    default:
      return state;
  }
};
