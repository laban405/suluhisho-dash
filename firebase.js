import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import { firebaseConfig } from '../config/firebaseApp.config';

const firebaseConfig = {
  apiKey: "AIzaSyA6fqQGL4XpoGQ3kVrTiY2kKND_-3M7gf8",
  authDomain: "suluhisho-53dcb.firebaseapp.com",
  projectId: "suluhisho-53dcb",
  storageBucket: "suluhisho-53dcb.appspot.com",
  messagingSenderId: "911955316385",
  appId: "1:911955316385:web:6edda7cc26dee8a6a72ae0",
  measurementId: "G-QR4MF9C2KW",
};
// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
