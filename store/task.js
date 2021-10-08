import { firebase } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

//reference to the "tasks" collection in Firestore
const tasksRef = firebase.firestore().collection('tasks');

const SET_ALL_TASKS = 'SET_ALL_TASKS';
const CLEAR_ALL_TASKS = 'CLEAR_ALL_TASKS';
const ADD_TASK = 'ADD_TASK'
const UPDATE_TASK = 'UPDATE_TASK'
const DELETE_TASK = 'DELETE_TASK'

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

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    task
  }
}

export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task
  }
}

export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId
  }
}

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
      await firebase
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
          dispatch(setAllTasks(tasks));
        });
    } catch (err) {
      console.log(err);
    }
  };
};

//not fully tested, but almost fully tested
export const _createTask = ({name, priority, category}) => {
  return async (dispatch) => {
    try {
      const data = {
        name,
        priority,
        category
      };
      let id = await firebase
        .firestore()
        .collection('tasks')
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .add(data).then( (result) => {
          return result.id
        })

      dispatch(addTask({
        name,
        priority,
        category,
        id}))
    } catch (err) {
      console.log(err);
    }
  };
};

const _updateTask = (task) => {
  return async (dispatch) => {
    try {
      const res = await tasksRef.doc(firebase.auth().currentUser.uid).collection('userTasks').doc(task.id).update(task);

      dispatch(updateTask(task))
    } catch (err) {
      console.log(err);
    }
  };
};

const _deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      await tasksRef.doc(firebase.auth().currentUser.uid).collection('userTasks').doc(taskId).delete();
      dispatch(deleteTask(taskId))
    } catch (err) {
      console.log(err);
    }
  };
};

const state = {
  tasks: []
}
export default (state, action) => {
  switch (action.type) {
    case SET_ALL_TASKS:
      return {...state, tasks: action.tasks};
    case CLEAR_ALL_TASKS:
      return {...state, tasks: []};
    case ADD_TASK:
      return {...state, tasks: [...state.tasks, action.task]};
    case UPDATE_TASK:
      const updatedTasks = state.tasks.map( (task) => {
        if(task.id === action.task.id){
          return action.task
        }
      })
      return {...state, tasks: updatedTasks}
    case DELETE_TASK:
      const deletedTasks = state.tasks.filter( (task) =>
        task.id !== action.taskId
      )
      return {...state, tasks: deletedTasks}
    default:
      return state;
  }
};
