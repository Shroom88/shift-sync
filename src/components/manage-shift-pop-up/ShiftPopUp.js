import React from "react";
import { useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import "./shift-pop-up.scss";

function ShiftPopUp({ currDate, currCell, scheduleId, children }) {
  const { shift, setShift, updateSchedule } = useContext(FirebaseContext);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setShift(children);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setShift(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSchedule(scheduleId, currCell);
    setIsOpen(false);
  };

  return (
    <div className="shift-edit">
      <button
        className="shift-edit__shift-btn"
        data-shift={children}
        onClick={handleOpen}
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
              <h2>Set Shift for {currDate}</h2>
            ) : (
              <h2>Edit Shift for {currDate}</h2>
            )}
            <form onSubmit={handleSubmit}>
              <label htmlFor="shift">Set Shift:</label>
              <input
                type="text"
                id="shift"
                name="shift"
                onChange={handleChange}
                value={shift}
              />

              <label htmlFor="rest">Set as Rest Day</label>
              <input type="checkbox" id="rest" name="rest" />

              <label htmlFor="notify">Notify via e-mail:</label>
              <input type="checkbox" id="notify" name="notify" />

              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShiftPopUp;
