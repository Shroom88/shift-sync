import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import Trash from "../../assets/trash-icon.svg";
import { confirmAlert } from "react-confirm-alert";
import "../admin-panel/admin-tables.scss";

function Requests() {
  const { requests, userData, deleteShiftRequest } =
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
    <div className="admin-tables">
      {requests.length === 0 ? (
        <h1 className="admin-tables__header">No New Requests</h1>
      ) : (
        <div className="admin-tables__wrapper">
          <h1 className="admin-tables__header">Requests</h1>
          <ul className="admin-tables__list">
            <li className="admin-tables__item">
              <h2 className="admin-tables__title">User Email</h2>
              <h2 className="admin-tables__title">Weekday</h2>
              <h2 className="admin-tables__title">Reason</h2>
              <h2 className="admin-tables__title">Delete</h2>
            </li>
            {requests.map((request) => (
              <li className="admin-tables__item" key={request.id}>
                <p className="admin-tables__cell">
                  {userData
                    .filter((user) => user.id === request.userId)
                    .map((user) => user.email)}
                </p>
                <p className="admin-tables__cell">{request.weekday}</p>
                <p className="admin-tables__cell">{request.request}</p>
                <button
                  className="admin-tables__delete"
                  onClick={() => handleDelete(request.id)}
                >
                  <img
                    className="admin-tables__icon"
                    src={Trash}
                    alt="trash icon"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Requests;
