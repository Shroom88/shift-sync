import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import Requests from "../requests/Requests";
import Users from "../user-list/Users";
import Loader from "../loader/Loader";
import Logo from "../../assets/logo.png";
import { ToastContainer } from "react-toastify";

import "./admin-panel.scss";

function AdminPanel() {
  const { isAdmin, isLoading, getAverageWorkdays, averageWorkdays } =
    useContext(FirebaseContext);

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getAverageWorkdays();
  });

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return isLoading ? (
    <Loader />
  ) : isAdmin ? (
    <div className="admin container">
      <div className="admin__header-wrapper">
        <img className="admin__logo" src={Logo} alt="Logo" />
        <h1 className="admin__header">Admin Panel</h1>
        <img className="admin__logo" src={Logo} alt="Logo" />
      </div>

      <div className="admin__average">
        Average Workdays Per Week:{" "}
        <span className="admin__workdays">{averageWorkdays}</span>
      </div>

      {toggle ? <Users /> : <Requests />}
      <div className="admin__nav">
        <button className="admin__toggle-btn" onClick={handleToggle}>
          {toggle ? <span>View Requests</span> : <span>View Users</span>}
        </button>
        <a className="admin__anchor" href="/">
          Back to ShiftSync
        </a>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  ) : (
    <div className="admin__no-permissions">
      <h1>You do not have permissions to be here.</h1>
      <a className="admin__anchor" href="/">
        Back to ShiftSync
      </a>
    </div>
  );
}

export default AdminPanel;
