import React from "react";
import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import "../manage-shift-pop-up/shift-pop-up.scss";

function RequestPopup() {
  const { user, addShiftRequest, weekday } = useContext(FirebaseContext);

  const [isOpen, setIsOpen] = useState(false);
  const [textInput, setTextInput] = useState("");

  const options = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  };

  const handleTextArea = (e) => {
    setTextInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      userId: user.uid,
      weekday,
      request: textInput,
    };
    addShiftRequest(request);
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={togglePopUp} className="shifts__btn">
        Request Time Off
      </button>
      {isOpen && (
        <div className="shift-edit__popup">
          <div className="shift-edit__popup-content">
            <button className="shift-edit__close-btn" onClick={togglePopUp}>
              &times;
            </button>
            <h2 className="shift-edit__header">Request Change of graphic</h2>
            <form className="shift-edit__form" onSubmit={handleSubmit}>
              <Dropdown
                options={options}
                defaultSelect="Choose Weekday"
                about="weekday"
              />

              <label className="shift-edit__label" htmlFor="reason">
                Please, explain why you want to change/lay off your shift:
              </label>
              <textarea
                className="shift-edit__textarea"
                rows="5"
                onChange={handleTextArea}
                required
              ></textarea>

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

export default RequestPopup;
