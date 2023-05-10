import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import LogIn from "../login/LogIn";
import "./shifts.scss";

function Shifts() {
  const { schedules, userData, user, handleLogout } =
    useContext(FirebaseContext);

  const dates = [];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  const dateOptions = {
    month: "numeric",
    day: "2-digit",
  };

  return user ? (
    <div>
      <h1>Welcome to ShiftSync, {user.email}</h1>
      <div className="shifts container">
        <div className="shifts__row">
          <div className="shifts__col shifts__col--header">User</div>
          {dates.map((date) => (
            <div
              className="shifts__col shifts__col--header"
              key={date.getTime()}
            >
              {weekdays[date.getDay()]} (
              {date.toLocaleDateString(undefined, dateOptions)})
            </div>
          ))}
        </div>
        {schedules.map((schedule) => (
          <div className="shifts__row" key={schedule.id}>
            <div className="shifts__col" key={schedule.userId}>
              {userData
                .filter((user) => user.id === schedule.userId)
                .map((user) => user.email)}
            </div>
            {dates.map((date) => (
              <div className="shifts__col" key={[weekdays[date.getDay()]]}>
                <button type=""> {schedule[weekdays[date.getDay()]]}</button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <button type="" className="shifts__btn" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  ) : (
    <LogIn />
  );
}

export default Shifts;
