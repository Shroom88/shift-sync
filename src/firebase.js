import firebase from "firebase/compat/app";
// import 'firebase/compat/auth';
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBz22nAeKc_E2XWeem5UUbnu5KSSBzYpoA",
  authDomain: "shift-sync.firebaseapp.com",
  projectId: "shift-sync",
  storageBucket: "shift-sync.appspot.com",
  messagingSenderId: "141396690875",
  appId: "1:141396690875:web:3c5999d8d11329936be69e",
  measurementId: "G-XN7TY3BTH6",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
