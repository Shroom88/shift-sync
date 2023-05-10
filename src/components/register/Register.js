import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import "../login/login.scss";

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
    <div className="login container">
      <h2 className="login__header">Register</h2>
      <form className="login__form" onSubmit={handleRegister}>
        <input
          className="login__input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />

        <input
          className="login__input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button className="login__btn" type="submit">
          Register
        </button>
      </form>
      <button className="login__btn" onClick={() => handleLogInSwitch()}>
        Already have an account? Log In here.
      </button>
      <br />
      {error && <div>{error}</div>}
    </div>
  );
}

export default Register;
