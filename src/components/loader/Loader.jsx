import React from "react";
import Logo from "../../assets/logo.svg";
import "./loader.scss";

function Loader() {
  return (
    <div className="loader-container">
      <img src={Logo} alt="Logo" className="loader" />
    </div>
  );
}

export default Loader;
