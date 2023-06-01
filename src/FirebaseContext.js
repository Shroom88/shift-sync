import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  const [error, setError] = useState("");
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
  const [isOwner, setIsOwner] = useState(false);
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

        setIsAdmin(currentUserRole === "admin" || currentUserRole === "owner");
        setIsOwner(currentUserRole === "owner");
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
    const password = event.target.value;
    if (password.length < 6) {
      setError("Password must be at least 6 symbols!");
    } else {
      setError("");
    }
    setPassword(password);
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
          Mon: "10:00 - 18:00",
          Tue: "00:00 - 08:00",
          Wed: "10:00 - 18:00",
          Thu: "10:00 - 18:00",
          Fri: "18:00 - 00:00",
          Sat: "Rest Day",
          Sun: "Rest Day",
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

      const employee = userData
        .filter((user) => user.id === request.userId)
        .map((u) => u.name)
        .toString();

      const subject = "ShiftSync: An employee has sent a request";
      const text = `Employee ${employee} has requested a change in his schedule for ${request.weekday}:\n\n${request.request}`;

      const adminMails = userData
        .filter((user) => user.role === "admin" || user.role === "owner")
        .map((u) => u.email);

      adminMails.forEach((admin) => {
        handleSendEmail({ to: admin, subject: subject, text: text });
      });

      // Add the new request to the collection
      await collectionRef.add(request);
      toast.success("Request added successfully!");
    } catch (error) {
      toast.error("Error adding item.");
    }
  };

  const updateRole = async (userId, role) => {
    try {
      const docRef = db.collection("users").doc(userId);
      await docRef.update({
        role: role,
      });
      toast.success(
        `User ${
          role === "admin" ? "promoted to Admin" : "demoted to user"
        } successfully!`
      );
    } catch (error) {
      toast("Oops, an error has occurred.");
      console.log(error);
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

  const handleSendEmail = async (mailData) => {
    const sendMail = firebase.functions().httpsCallable("sendEmail");

    await sendMail(mailData)
      .then(() => {})
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const updateSchedule = async (
    scheduleId,
    currCell,
    currDate,
    isMailSent,
    userEmail
  ) => {
    try {
      const scheduleRef = db.collection("Schedules").doc(scheduleId);
      const updateSchedule = {};
      updateSchedule[currCell] = shift; //update the specific day in the schedule collection

      if (isMailSent) {
        const username = userData
          .filter((user) => user.email === userEmail)
          .map((user) => user.name);
        const subject =
          "Notification from ShiftSync: Your schedule has been changed.";
        const content = `Hey, ${username}\nYour schedule for ${currDate} has been changed to ${shift}!`;
        handleSendEmail({
          to: userEmail,
          subject: subject,
          text: content,
        }).then(() => toast.success("Email sent successfuly!"));
      }

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
        toast("Come back soon!");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const clearStates = () => {
    setError("");
    setEmail("");
    setFullName("");
    setPassword("");
    setRegister(false);
    setIsAdmin(false);
    setIsOwner(false);
  };

  return (
    <FirebaseContext.Provider
      value={{
        userData,
        schedules,
        requests,
        loggedSchedule,
        fullName,
        error,
        email,
        password,
        shift,
        weekday,
        user,
        isLoading,
        isAdmin,
        isOwner,
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
        updateRole,
        clearStates,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseContext;
