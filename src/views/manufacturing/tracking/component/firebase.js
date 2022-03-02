import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyABhe9SSpllMWLUqDU-g9u5dTZxFlU8mpY",
    authDomain: "productcpc1hn.firebaseapp.com",
    databaseURL: "https://productcpc1hn.firebaseio.com",
    projectId: "productcpc1hn",
    storageBucket: "productcpc1hn.appspot.com",
    messagingSenderId: "18665055577",
    appId: "1:18665055577:web:55ce5ecaaaac23cda25848",
    measurementId: "G-K71P8Y7ZLN"
  };
  // Initialize Firebase
 const otherProject =  firebase.initializeApp(firebaseConfig,'app');
 
 const db = otherProject.database();
 const storage = otherProject.storage();
 export {db, storage}