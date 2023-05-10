import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";

function Register({ handleLogInSwitch }) {
  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  } = useContext(FirebaseContext);
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
      <button type="" onClick={() => handleLogInSwitch()}>
        Switch to Log In
      </button>
      <br />
      {error && <div>{error}</div>}
    </div>
  );
}

export default Register;
