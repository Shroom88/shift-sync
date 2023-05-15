import React from "react";
import { useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import "./dropdown.scss";

function Dropdown({ options }) {
  const [isOpen, setIsOpen] = useState(false);

  const { shift, setShift } = useContext(FirebaseContext);

  const toggleDropdown = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setShift(option.value);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__header" onClick={toggleDropdown}>
        {shift !== "No Data" ? shift : "Select a Shift"}
      </div>
      {isOpen && (
        <ul className="dropdown__options">
          {options.map((option) => (
            <li key={option.value} className="dropdown__option">
              <button
                className="dropdown__btn"
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
