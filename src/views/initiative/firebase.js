import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
var firebaseConfig = {
  apiKey: "AIzaSyAZqrSJl1045rd6h5yJ0ylKVmBzN4fDP6Y",
  authDomain: "kaizen-cpc1hn.firebaseapp.com",
  databaseURL: "https://kaizen-cpc1hn.firebaseio.com",
  projectId: "kaizen-cpc1hn",
  storageBucket: "kaizen-cpc1hn.appspot.com",
  messagingSenderId: "349156007242",
  appId: "1:349156007242:web:cfd6a8a747af97e238f5b3",
  measurementId: "G-E2NGM33K8M"
};
// Initialize Firebase
const Offer = firebase.initializeApp(firebaseConfig, "offer");

const db = Offer.database();
const storage = Offer.storage();
export { db, storage };
