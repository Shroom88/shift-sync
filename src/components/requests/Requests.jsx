import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import Loader from "../loader/Loader";
import Trash from "../../assets/trash-icon.svg";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./requests.scss";

function Requests() {
  const { requests, userData, isLoading, isAdmin, deleteShiftRequest } =
    useContext(FirebaseContext);

  const handleDelete = (requestId) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this request",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteShiftRequest(requestId),
        },
        {
          label: "No",
          onClick: () => 0,
        },
      ],
      closeOnEscape: true,
    });
  };

  return (
    <div className="container">
      <div className="requests">
        {isLoading ? (
          <Loader />
        ) : isAdmin ? (
          requests.length === 0 ? (
            <div className="">
              <h1 className="requests__header">No New Requests</h1>
            </div>
          ) : (
            <div className="">
              <h1 className="requests__header">Requests</h1>
              <ul className="requests__list">
                <li className="requests__item">
                  <h2 className="requests__title">User Email</h2>
                  <h2 className="requests__title">Weekday</h2>
                  <h2 className="requests__title">Reason</h2>
                  <h2 className="requests__title">Delete</h2>
                </li>
                {requests.map((request) => (
                  <li className="requests__item" key={request.id}>
                    <p className="requests__cell">
                      {userData
                        .filter((user) => user.id === request.userId)
                        .map((user) => user.email)}
                    </p>
                    <p className="requests__cell">{request.weekday}</p>
                    <p className="requests__cell">{request.request}</p>
                    <button
                      className="requests__delete"
                      onClick={() => handleDelete(request.id)}
                    >
                      <img
                        className="requests__icon"
                        src={Trash}
                        alt="trash icon"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          <div className="">
            <h1 className="requests__header">
              No do not have any permissions!
            </h1>
          </div>
        )}
      </div>

      <a className="requests__anchor" href="/">
        Back
      </a>
    </div>
  );
}

export default Requests;
