import React from "react";
import "./header.scss";
import Logo from "../../assets/logo-no-background.png";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";

function Header() {
  const { user, setRegister, handleLogout, isLoading } =
    useContext(FirebaseContext);

  const handleLoginBtn = () => {
    setRegister(false);
  };

  const handleRegBtn = () => {
    setRegister(true);
  };

  return (
    <div className="header">
      <img className="header__logo" src={Logo} alt="shiftsync logo" />
      <div className="header__cube"></div>
      <div className="header__cube-2"></div>
      <div className="header__cube-3"></div>
      <div className="header__cube-4"></div>
      {isLoading ? (
        <div></div>
      ) : user ? (
        <div className="header__logged">
          <h1 className="header__welcome">Hello, {user.email}</h1>
          <button className="header__btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <button className="header__btn" onClick={handleLoginBtn}>
            Log In
          </button>
          <button className="header__btn" onClick={handleRegBtn}>
            Register
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
