import { firebase } from '../config/firebase';

const tasksRef = firebase.firestore().collection('tasks')

export const createTask = () => { // pass user ID
  const data = {
    name: "EGGS",
    priority: "HIGH",
    category: "GROCERIES",
    // add user ID to associate task w/ user?
  };
  tasksRef
  .doc("randy1")
  .set(data)
  .then((data) => {
      console.log(data)
  })
  .catch((error) => {
      alert(error)
  });
}


// REF Document
// https://firebase.google.com/docs/firestore/query-data/queries
