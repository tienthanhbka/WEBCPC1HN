import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyAzFHh412DpEzd8yQ_TTUfyyKRDlJ6_P24",
  authDomain: "jghghm-94b65.firebaseapp.com",
  databaseURL: "https://jghghm-94b65.firebaseio.com",
  projectId: "jghghm-94b65",
  storageBucket: "jghghm-94b65.appspot.com",
  messagingSenderId: "1032134289773",
  appId: "1:1032134289773:web:6310ef696baa1063059264",
  measurementId: "G-1MSTEL2XYM"
};
// Initialize Firebase
const otherProject = firebase.initializeApp(firebaseConfig, "pharma");

const db = otherProject.database();
const storage = otherProject.storage();
export { db, storage };
