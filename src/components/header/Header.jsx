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
    <header className="header">
      <img className="header__logo" src={Logo} alt="shiftsync logo" />
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
        <div className="header__wrapper">
          <button className="header__btn" onClick={handleLoginBtn}>
            Log In
          </button>
          <button className="header__btn" onClick={handleRegBtn}>
            Register
          </button>
          <a href="/contacts" className="header__btn">
            Contacts
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;
