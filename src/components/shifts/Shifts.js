import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import LogIn from "../login/LogIn";

function Shifts() {
  const { user, handleLogout } = useContext(FirebaseContext);
  return user ? (
    <div>
      <h1>Shifts Table...</h1>
      <button type="" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  ) : (
    <LogIn />
  );
}

export default Shifts;
