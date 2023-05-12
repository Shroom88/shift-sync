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
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [register, setRegister] = useState(false);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (user) {
      const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserData(documents);
      });

      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db.collection("Schedules").onSnapshot((snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchedules(documents);
      });

      return unsubscribe;
    }
  }, [user]);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log("login");
        setIsLoading(false);
      });
    console.log(error);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setIsLoading(false);
        const user = userCredential.user;
        const defaultRole = "user";

        const defaultSchedules = {
          Mon: "N/A",
          Tue: "N/A",
          Wed: "N/A",
          Thu: "N/A",
          Fri: "N/A",
          Sat: "N/A",
          Sun: "N/A",
        };

        db.collection("users").doc(user.uid).set({
          name: fullName,
          email: email,
          role: defaultRole,
        });

        db.collection("Schedules").doc().set({
          Mon: defaultSchedules.Mon,
          Tue: defaultSchedules.Tue,
          Wed: defaultSchedules.Wed,
          Thu: defaultSchedules.Thu,
          Fri: defaultSchedules.Fri,
          Sat: defaultSchedules.Sat,
          Sun: defaultSchedules.Sun,
          userId: user.uid,
        });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setEmail("");
    setPassword("");
    setFullName("");
    setError("");

    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log("logout");
        setIsLoading(false);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{
        userData,
        schedules,
        fullName,
        email,
        password,
        error,
        user,
        isLoading,
        register,
        setRegister,
        setEmail,
        setPassword,
        handleFullNameChange,
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
