import React from "react";
import { useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import Dropdown from "../dropdown/Dropdown";
import PropTypes from "prop-types";
import "./shift-pop-up.scss";

function ShiftPopUp({ currDate, currCell, scheduleId, children, currEmail }) {
  const { isAdmin, setShift, updateSchedule } = useContext(FirebaseContext);

  const [isOpen, setIsOpen] = useState(false);
  const [sendMail, setSendMail] = useState(true);

  // TODO: add to a collection in firebase
  const options = [
    { value: "Rest Day", label: "Rest Day" },
    { value: "10:00 - 18:00", label: "Day Shift" },
    { value: "18:00 - 00:00", label: "Middle Shift" },
    { value: "00:00 - 08:00", label: "Night Shift" },
  ];

  const handleOpen = () => {
    setShift(children);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleEmailChange = () => {
    setSendMail(!sendMail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSchedule(scheduleId, currCell, currDate, sendMail, currEmail);
    setIsOpen(false);
  };

  return (
    <div className="shift-edit">
      <button
        className="shift-edit__shift-btn"
        data-shift={children}
        onClick={handleOpen}
        disabled={!isAdmin}
      >
        {children}
      </button>

      {isOpen && (
        <div className="shift-edit__popup">
          <div className="shift-edit__popup-content">
            <button className="shift-edit__close-btn" onClick={handleClose}>
              &times;
            </button>
            {children === "No Data" ? (
              <h2 className="shift-edit__header">Set Shift for {currDate}</h2>
            ) : (
              <h2 className="shift-edit__header">Edit Shift for {currDate}</h2>
            )}
            <form className="shift-edit__form" onSubmit={handleSubmit}>
              <Dropdown
                options={options}
                defaultSelect="Select a shift"
                about="shift"
              />

              <label className="shift-edit__custom-checkbox" htmlFor="notify">
                Notify via e-mail:
                <input
                  className="shift-edit__checkbox"
                  type="checkbox"
                  id="notify"
                  name="notify"
                  onChange={handleEmailChange}
                  checked={sendMail}
                />
                <span className="shift-edit__checkmark"></span>
              </label>

              <input
                className="shift-edit__submit"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

ShiftPopUp.propTypes = {
  currDate: PropTypes.string,
  currCell: PropTypes.string,
  scheduleId: PropTypes.string,
  currEmail: PropTypes.string,
};

export default ShiftPopUp;
