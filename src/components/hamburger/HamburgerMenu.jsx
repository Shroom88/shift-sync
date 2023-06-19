import React from "react";
import "./hamburger.scss";
import { useState, useRef, useContext, useEffect } from "react";
import FirebaseContext from "../../FirebaseContext";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { handleLogout, isAdmin } = useContext(FirebaseContext);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`hamburger ${isOpen ? "open" : ""}`}
      onClick={handleClick}
      ref={menuRef}
    >
      <div className="hamburger__line"></div>
      <div className="hamburger__line"></div>
      <div className="hamburger__line"></div>
      {isOpen && (
        <div className="hamburger__menu">
          <button className="hamburger__btn" onClick={handleLogout}>
            Log Out
          </button>
          {isAdmin ? (
            <a href="/admin-panel" className="hamburger__btn">
              Admin Panel
            </a>
          ) : (
            <a href="/contacts" className="hamburger__btn">
              Contacts
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
