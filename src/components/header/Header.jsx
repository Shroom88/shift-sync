import React from "react";
import "./header.scss";
import Logo from "../../assets/logo.png";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import HamburgerMenu from "../hamburger/HamburgerMenu";

function Header() {
  const { user, userData, setRegister, isLoading, clearStates } =
    useContext(FirebaseContext);

  const handleLoginBtn = () => {
    clearStates();
    setRegister(false);
  };

  const handleRegBtn = () => {
    clearStates();
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
          <h1 className="header__welcome">
            Hello,{" "}
            {userData
              .filter((u) => u.email === user.email)
              .map((user) => user.name)}
          </h1>
          <HamburgerMenu />
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
