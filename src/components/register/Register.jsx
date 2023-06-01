import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import PropTypes from "prop-types";

import "../login/login.scss";
import "react-toastify/dist/ReactToastify.css";

function Register({ handleLogInSwitch }) {
  const {
    fullName,
    error,
    email,
    password,
    handleFullNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  } = useContext(FirebaseContext);

  return (
    <div className="login">
      <h2 className="login__header">Register</h2>
      <form className="login__form" onSubmit={handleRegister}>
        <input
          className="login__input"
          type="name"
          value={fullName}
          placeholder="Full Name"
          onChange={handleFullNameChange}
          required
        />

        <input
          className="login__input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
          required
        />

        <input
          className="login__input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordChange}
          required
        />

        {error && <span className="login__error">{error}</span>}

        <button disabled={error !== ""} className="login__btn" type="submit">
          Register
        </button>
      </form>
      <button className="login__btn" onClick={() => handleLogInSwitch()}>
        Already have an account?
      </button>
      <br />
    </div>
  );
}

Register.propTypes = {
  handleLogInSwitch: PropTypes.func,
};

export default Register;
