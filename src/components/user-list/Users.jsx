import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import { confirmAlert } from "react-confirm-alert";

import OwnerIcon from "../../assets/owner-icon.svg";
import AdminIcon from "../../assets/admin-icon.svg";
import AddAdminIcon from "../../assets/add-admin-icon.svg";
import RemoveAdminIcon from "../../assets/remove-admin-icon.svg";
import UserIcon from "../../assets/user-icon.svg";
import NotAvailable from "../../assets/not-avaliable.svg";

import "../admin-panel/admin-tables.scss";

function Users() {
  const { userData, updateRole, isOwner } = useContext(FirebaseContext);

  const handleAddAdmin = (userId) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to promote this user to Admin?",
      buttons: [
        {
          label: "Yes",
          onClick: () => updateRole(userId, "admin"),
        },
        {
          label: "No",
          onClick: () => 0,
        },
      ],
      closeOnEscape: true,
    });
  };

  const handleRemoveAdmin = (userId) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to demote this Admin?",
      buttons: [
        {
          label: "Yes",
          onClick: () => updateRole(userId, "user"),
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
      {userData.length === 0 ? (
        <h1 className="admin-tables__header">No Users</h1>
      ) : (
        <div className="admin-tables__wrapper">
          <h1 className="admin-tables__header">Users</h1>
          <ul className="admin-tables__list">
            <li className="admin-tables__item">
              <h2 className="admin-tables__title">Email</h2>
              <h2 className="admin-tables__title">Name</h2>
              <h2 className="admin-tables__title">Role</h2>
              <h2 className="admin-tables__title">Add/Remove Permissions</h2>
            </li>
            {userData.map((user) => (
              <li className="admin-tables__item" key={user.id}>
                <p className="admin-tables__cell">{user.email}</p>
                <p className="admin-tables__cell">{user.name}</p>
                <p className="admin-tables__cell">
                  {user.role === "owner" ? (
                    <img
                      className="admin-tables__icon"
                      src={OwnerIcon}
                      alt="owner icon"
                    />
                  ) : user.role === "admin" ? (
                    <img
                      className="admin-tables__icon"
                      src={AdminIcon}
                      alt="admin icon"
                    />
                  ) : (
                    <img
                      className="admin-tables__icon"
                      src={UserIcon}
                      alt="user icon"
                    />
                  )}
                </p>
                {!isOwner ? (
                  <button disabled>
                    <img
                      className="admin-tables__icon"
                      src={NotAvailable}
                      alt="N/A"
                    />
                  </button>
                ) : user.role === "user" ? (
                  <button
                    className="admin-tables__make-admin"
                    onClick={() => handleAddAdmin(user.id)}
                  >
                    <img
                      className="admin-tables__icon"
                      src={AddAdminIcon}
                      alt="add admin icon"
                    />
                  </button>
                ) : (
                  <button
                    className="admin-tables__remove-admin"
                    onClick={() => handleRemoveAdmin(user.id)}
                    disabled={user.role === "owner"}
                  >
                    <img
                      className="admin-tables__icon admin-tables__icon--add"
                      src={
                        user.role === "owner" ? NotAvailable : RemoveAdminIcon
                      }
                      alt="remove admin icon"
                    />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Users;
