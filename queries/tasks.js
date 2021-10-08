import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { firebase } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

//reference to the "tasks" collection in Firestore
const tasksRef = firebase.firestore().collection('tasks');


export const createTask = async () => {
  try {
    const userId = await AsyncStorage.getItem('USER_ID');
    console.log(userId)
    const taskId = tasksRef.doc().id;

    const data = {
      name: 'CHOCOLATE',
      priority: 'HIGH',
      category: 'GROCERIES',
      id: taskId,
      userId
    };
    const res = await tasksRef.doc(taskId).set(data);
    //.set = create
  } catch (err) {
    console.log(err);
  }
};


export const getTasks = async () => {
  try {
    // logged in person ID
    const userId = await AsyncStorage.getItem('USER_ID');
    const res = await tasksRef.get();
    const taskId = res.docs.map((doc) => doc.id); // Array of id: string
    const taskInstances = res.docs.map((doc) => doc.data()); // Array of {name: string, priority: string, category: string}
    console.log('this is the response---->', taskInstances);
  } catch (err) {
    console.log(err);
  }
};


export const updateTask = async () => {
  try {
    const taskId = 'bOgYpeoujdr7OUBxpdSH';
    const res = await tasksRef.doc(taskId).update({
      name: 'cookies',
      priority: 'low',
    });
  } catch (err) {
    console.log(err);
  }
};


export const deleteTask = async () => {
  try {
    const taskId = 'bOgYpeoujdr7OUBxpdSH';
    const res = await tasksRef.doc(taskId).delete();
  } catch (err) {
    console.log(err);
  }
};


// Documentation
// https://firebase.google.com/docs/firestore/query-data/queries
//CRUD Operations for Database Querying for Firebase
//https://saveyourtime.medium.com/firebase-cloud-firestore-add-set-update-delete-get-data-6da566513b1b
//https://react-native-async-storage.github.io/async-storage/docs/usage/
