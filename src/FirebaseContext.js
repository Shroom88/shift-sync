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
  const [fullName, setFullName] = useState("");
  const [shift, setShift] = useState("No Data");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [register, setRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedSchedule, setLoggedSchedule] = useState({});

  /* eslint-disable */
  useEffect(() => {
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
          setIsLoading(false);

          if (user) {
            const filteredSchedule = documents.filter(
              (schedule) => schedule.userId === user.uid
            );
            setLoggedSchedule(Object.assign({}, ...filteredSchedule));
            setIsLoading(false);
          }
        });

      return () => {
        unsubscribeUsers();
        unsubscribeSchedules();
      };
    }
  }, [user]);
  /* eslint-enable */

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
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
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  // const handleSendEmail = (to, newShift) => {
  //   const message = "test eho hihi" + newShift;

  //   // Create a request payload
  //   const payload = {
  //     to: to,
  //     subject: "test123",
  //     message: message,
  //   };

  //   // Make a POST request to the Firebase Cloud Function endpoint
  //   fetch("https://helloworld-bw2gjdd3aa-uc.a.run.app")
  //     .then((response) => {
  //       if (response.ok) {
  //         console.log("Test");
  //         // Handle success or display a success message to the user
  //       } else {
  //         throw new Error("Error");
  //       }
  //     })
  //     .then((data) => {
  //       console.log("Email sent successfully!", data);
  //       // Handle success or display a success message to the user
  //     })
  //     .catch((error) => {
  //       console.error("Error sending email:", error);
  //       // Handle error or display an error message to the user
  //     });
  // };

  const updateSchedule = async (scheduleId, field, userEmail, sendMail) => {
    try {
      const scheduleRef = db.collection("Schedules").doc(scheduleId);
      const updateSchedule = {};
      updateSchedule[field] = shift; //update the specific day in the schedule collection

      // if (sendMail) {
      //   handleSendEmail(userEmail, "test");
      // }

      await scheduleRef.update(updateSchedule);
    } catch (error) {
      console.log(error);
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
      })
      .catch((error) => {
        setError(error.message);
        console.log("logout");
        setIsLoading(false);
      });
  };

  const clearStates = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setError("");
    setRegister(false);
  };

  return (
    <FirebaseContext.Provider
      value={{
        userData,
        schedules,
        loggedSchedule,
        fullName,
        email,
        password,
        shift,
        error,
        user,
        isLoading,
        isAdmin,
        register,
        setRegister,
        setFullName,
        setEmail,
        setPassword,
        setShift,
        handleFullNameChange,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
        handleRegister,
        handleLogout,
        updateSchedule,
        clearStates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
