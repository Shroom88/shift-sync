import { createContext } from "react";
import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
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
  const [fullName, setFullName] = useState("");
  const [shift, setShift] = useState("No Data");
  const [weekday, setWeekday] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [requests, setRequests] = useState([]);
  const [register, setRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedSchedule, setLoggedSchedule] = useState({});

  /* eslint-disable */
  useEffect(() => {
    setIsLoading(true);

    if (user) {
      const unsubscribeUsers = db.collection("users").onSnapshot((snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // items
        setUserData(documents);
        const currentUserRole = documents
          .filter((u) => u.email === user.email)
          .map((user) => user.role)
          .toString();

        setIsAdmin(currentUserRole === "admin");
        setIsLoading(false);
      });

      const unsubscribeSchedules = db
        .collection("Schedules")
        .onSnapshot((snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setSchedules(documents);

          const filteredSchedule = documents.filter(
            (schedule) => schedule.userId === user.uid
          );
          setLoggedSchedule(Object.assign({}, ...filteredSchedule));
          setIsLoading(false);
        });

      const unsubscribeRequests = db
        .collection("Requests")
        .onSnapshot((snapshot) => {
          const documents = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRequests(documents);
          setIsLoading(false);
        });

      return () => {
        unsubscribeUsers();
        unsubscribeSchedules();
        unsubscribeRequests();
      };
    }
    setIsLoading(false);
  }, [user]);
  /* eslint-enable */

  useEffect(() => {
    setIsLoading(true);
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
        toast.success("Login Successfull, welcome!");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
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
          Mon: "No Data",
          Tue: "No Data",
          Wed: "No Data",
          Thu: "No Data",
          Fri: "No Data",
          Sat: "No Data",
          Sun: "No Data",
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
      .then(() => toast.success("User successfuly registered."))
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const addShiftRequest = async (request) => {
    try {
      // Create a reference to the collection
      const collectionRef = db.collection("Requests");

      // Add the new request to the collection
      await collectionRef.add(request);
      toast.success("Request added successfully!");
    } catch (error) {
      toast.error("Error adding item.");
    }
  };

  const deleteShiftRequest = async (requestId) => {
    try {
      // Create a reference to the document in the collection
      const documentRef = db.collection("Requests").doc(requestId);

      // Delete the document
      await documentRef
        .delete()
        .then(() => toast.success("Item deleted successfully!"));
    } catch (error) {
      toast.error("Error deleting item:");
      console.log(error);
    }
  };

  const updateSchedule = async (scheduleId, field, userEmail, sendMail) => {
    try {
      const scheduleRef = db.collection("Schedules").doc(scheduleId);
      const updateSchedule = {};
      updateSchedule[field] = shift; //update the specific day in the schedule collection

      // if (sendMail) {
      //   handleSendEmail(userEmail, "test");
      // }

      await scheduleRef
        .update(updateSchedule)
        .then(() => toast.success("Shift successfuly updated."));
    } catch (error) {
      console.log(error);
      toast.error("An error ocurred.");
    }
  };

  const handleLogout = () => {
    setIsLoading(true);
    clearStates();

    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsLoading(false);
        toast.success("Come back soon!");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const clearStates = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setRegister(false);
  };

  return (
    <FirebaseContext.Provider
      value={{
        userData,
        schedules,
        requests,
        loggedSchedule,
        fullName,
        email,
        password,
        shift,
        weekday,
        user,
        isLoading,
        isAdmin,
        register,
        setRegister,
        setFullName,
        setEmail,
        setPassword,
        setShift,
        setWeekday,
        handleFullNameChange,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        handleRegister,
        handleLogout,
        updateSchedule,
        addShiftRequest,
        deleteShiftRequest,
        clearStates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
