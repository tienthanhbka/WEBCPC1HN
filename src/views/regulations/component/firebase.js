import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyBGpPAqXtrvV_wSkeMH5k_NyPPwNSSUCVo",
    authDomain: "feedbackproduct-bdd6e.firebaseapp.com",
    databaseURL: "https://feedbackproduct-bdd6e.firebaseio.com",
    projectId: "feedbackproduct-bdd6e",
    storageBucket: "feedbackproduct-bdd6e.appspot.com",
    messagingSenderId: "19106558938",
    appId: "1:19106558938:web:b9a6ea665e51afea3a46e3",
    measurementId: "G-4EK0SSPE1N"
  };
  // Initialize Firebase
 const otherProject =  firebase.initializeApp(firebaseConfig,'feedback');
 
 const db = otherProject.database();
 const storage = otherProject.storage();
 export {db, storage}