import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBCeOI89IDuKmkE3JRQ5n0BZDHptHQ9R74",
    authDomain: "allocation-50709.firebaseapp.com",
    databaseURL: "https://allocation-50709-default-rtdb.firebaseio.com",
    projectId: "allocation-50709",
    storageBucket: "allocation-50709.appspot.com",
    messagingSenderId: "875539253978",
    appId: "1:875539253978:web:353711c8ffd8d0aae0f3e3",
    measurementId: "G-1D6MBKCPDS"
  };
  const Offer = firebase.initializeApp(firebaseConfig, "allocation");

const db = Offer.database();
const storage = Offer.storage();
export { db, storage };