import { createContext } from "react";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
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

const db = firebase.firestore();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError(error.message);
      });
    console.log(error);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const defaultRole = "user";

        return db.collection("users").doc(user.uid).set({
          email: email,
          role: defaultRole,
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();

    firebase
      .auth()
      .signOut()
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        data: db,
        email,
        password,
        error,
        user,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
