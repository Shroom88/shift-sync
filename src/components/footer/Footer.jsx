import React from "react";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer">
      <h3 className="footer__text">&copy; 2023 Gabriel Stanev</h3>

      <h3 className="footer__text">
        Faculty Number: <span className="footer__number">1809011299</span>
      </h3>

      <h3 className="footer__text">Version: 1.0</h3>
    </div>
  );
}

export default Footer;
