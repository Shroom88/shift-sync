import React from "react";
import "./notfound.scss";

function NotFound() {
  return (
    <div className="notfound">
      <h1 className="notfound__header">Oops, page not found :/</h1>
      <img
        className="notfound__img"
        src="https://http.cat/images/404.jpg"
        alt="404 cat"
      />
      <a className="notfound__anchor" href="/">
        Back to home page
      </a>
    </div>
  );
}

export default NotFound;
