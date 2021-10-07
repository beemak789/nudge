import { initializeApp } from "firebase/app";
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
// import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA3vHZIDlenmOC1QeZB7BolXbbYQlX2IOY",
  authDomain: "nudge-37143.firebaseapp.com",
  databaseURL: "https://nudge-37143.firebaseio.com",
  projectId: "nudge-37143",
  storageBucket: "nudge-37143.appspot.com",
  messagingSenderId: "954025429424",
  appId: "1:954025429424:ios:799a3a5d8e4befd0d26e75",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

let database = firebase.database();
export { firebase, database };
