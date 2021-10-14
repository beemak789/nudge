import { firebase } from '../config/firebase';
import { clearPlaces } from './places';

//reference to the "tasks" collection in Firestore
const tasksRef = firebase.firestore().collection('tasks');

const SET_ALL_TASKS = 'SET_ALL_TASKS';
const SET_CURR_TASK = 'SET_CURR_TASK';
const CLEAR_CURR_TASK = 'CLEAR_CURR_TASK';
const CLEAR_ALL_TASKS = 'CLEAR_ALL_TASKS';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const UPDATE_COMPLETED_STATUS = 'UPDATE_COMPLETED_STATUS';
const DELETE_TASK = 'DELETE_TASK';

export const setAllTasks = (tasks) => {
  return {
    type: SET_ALL_TASKS,
    tasks,
  };
};

export const setCurrTask = (currTask) => {
  return {
    type: SET_CURR_TASK,
    currTask,
  };
};

export const clearCurrTask = () => {
  return {
    type: CLEAR_CURR_TASK,
    currTask: {},
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
    task,
  };
};

export const updateTask = (task) => {
  return {
    type: UPDATE_TASK,
    task,
  };
};

export const updateCompletedStatus = (task) => {
  return {
    type: UPDATE_COMPLETED_STATUS,
    task,
  };
};

export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    taskId,
  };
};

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
export const _createTask = ({ name, priority, category }) => {
  return async (dispatch) => {
    try {
      const data = {
        name,
        priority,
        category,
        completed: false,
      };
      let id = await firebase
        .firestore()
        .collection('tasks')
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .add(data)
        .then((result) => {
          return result.id;
        });
      dispatch(
        addTask({
          name,
          priority,
          category,
          id,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};

const _updateTask = (task) => {
  return async (dispatch) => {
    try {
      const res = await tasksRef
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .doc(task.id)
        .update(task);

      dispatch(updateTask(task));
    } catch (err) {
      console.log(err);
    }
  };
};

export const _updateCompleteStatus = (item) => {
  return async (dispatch, getState) => {
    try {
      const { task } = getState();

      if (task.currTask.id === item.id) {
        console.log('is same');
        dispatch(clearPlaces());
      }

      const res = await tasksRef
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .doc(item.id)
        .update({
          completed: true,
        });

      const updatedTask = {
        ...item,
        completed: true,
      };

      dispatch(updateCompletedStatus(updatedTask));
    } catch (err) {
      console.log(err);
    }
  };
};

export const _updateIncompleteStatus = (task) => {
  return async (dispatch) => {
    try {
      const res = await tasksRef
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .doc(task.id)
        .update({
          completed: false,
        });

      const updatedTask = {
        ...task,
        completed: false,
      };

      dispatch(updateCompletedStatus(updatedTask));
    } catch (err) {
      console.log(err);
    }
  };
};

export const _deleteTask = (taskId) => {
  return async (dispatch, getState) => {
    try {
      const { task } = getState();
      if (task.currTask.id === taskId) {
        dispatch(clearPlaces());
      }
      await tasksRef
        .doc(firebase.auth().currentUser.uid)
        .collection('userTasks')
        .doc(taskId)
        .delete();
      dispatch(deleteTask(taskId));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {
  currTask: {},
  tasks: [],
  incomplete: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_TASKS:
      const incompleteTasks = action.tasks.filter(
        (task) => task.completed === false
      );
      return { ...state, tasks: action.tasks, incomplete: incompleteTasks };
    case SET_CURR_TASK:
      return { ...state, currTask: action.currTask };
    case CLEAR_CURR_TASK:
      return { ...state, currTask: action.currTask };
    case CLEAR_ALL_TASKS:
      return { ...state, tasks: [], incomplete: [], currTask: {} };
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task],
        incomplete: [...state.incomplete, action.task],
      };
    case UPDATE_TASK:
      const updatedTasks = state.tasks.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        }
        return task;
      });

      const updatedCurrTask =
        action.task.id === state.currTask.id ? action.task : state.currTask;

      const updatedIncomplete = state.incomplete.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
        incomplete: updatedIncomplete,
        currTask: updatedCurrTask,
      };

    case UPDATE_COMPLETED_STATUS:
      const allStatusTasks = state.tasks.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        }
        return task;
      });

      const statusCurrTask =
        action.task.id === state.currTask.id ? {} : state.currTask;

      let completedStatus = [];
      if (action.task.completed === true) {
        completedStatus = state.incomplete.filter(
          (task) => task.id !== action.task.id
        );
      } else if (action.task.completed === false) {
        completedStatus = [...state.incomplete, action.task];
      }

      return {
        ...state,
        tasks: allStatusTasks,
        incomplete: completedStatus,
        currTask: statusCurrTask,
      };
    case DELETE_TASK:
      const deletedTasks = state.tasks.filter(
        (task) => task.id !== action.taskId
      );
      const deleteCurrTask =
        action.taskId === state.currTask.id ? {} : state.currTask;

      const deletedIncomplete = state.incomplete.filter(
        (task) => task.id !== action.taskId
      );
      return {
        ...state,
        tasks: deletedTasks,
        incomplete: deletedIncomplete,
        currTask: deleteCurrTask,
      };
    default:
      return state;
  }
};
