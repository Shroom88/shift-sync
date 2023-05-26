import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import "./footer.scss";

function Footer() {
  const { isAdmin } = useContext(FirebaseContext);
  return (
    <div className="footer">
      {isAdmin && (
        <a href="/admin-panel" className="footer__btn">
          Admin Panel
        </a>
      )}
      <h3 className="footer__text">&copy; 2023 Gabriel Stanev</h3>
      <div className="footer__cube"></div>

      <h3 className="footer__text">
        Faculty Number: <span className="footer__number">1809011299</span>
      </h3>
      <div className="footer__cube-2"></div>

      <h3 className="footer__text">Version: 1.0</h3>
      <div className="footer__cube-3"></div>
    </div>
  );
}

export default Footer;
