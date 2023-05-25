import React from "react";
import { useState } from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import "./dropdown.scss";

function Dropdown({ options, defaultSelect, about }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const { setShift, setWeekday } = useContext(FirebaseContext);

  const toggleDropdown = () => {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    setValue(option.value);

    switch (about) {
      case "shift":
        setShift(option.value);
        break;

      case "weekday":
        setWeekday(option.value);
        break;

      default:
        break;
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown__header" onClick={toggleDropdown}>
        {value === "" ? defaultSelect : value}
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
