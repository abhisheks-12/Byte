import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7SNQta_loHHabOLwP-aOEu-pUxUU8epM",
  authDomain: "reels-7ed9c.firebaseapp.com",
  projectId: "reels-7ed9c",
  storageBucket: "reels-7ed9c.appspot.com",
  messagingSenderId: "582684292685",
  appId: "1:582684292685:web:148fa80bc802b8bf5ece04",
};

// Intilalize firebase
// getTimeStamp: firebase.firestore.FieldValue.getTimeStamp,
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// exports
export const auth = firebase.auth();

export const database = {
  users: firestore.collection("users"),
  posts:firestore.collection("posts"),
  getTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const storage = firebase.storage();

