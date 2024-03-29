import React from "react";
import { useContext } from "react";
import FirebaseContext from "../../FirebaseContext";
import LogIn from "../login/LogIn";
import Loader from "../loader/Loader";
import ShiftPopUp from "../manage-shift-pop-up/ShiftPopUp";
import RequestPopup from "../request-shift-pop-up/RequestPopup";
import "./shifts.scss";

function Shifts() {
  const { isAdmin, loggedSchedule, schedules, userData, user, isLoading } =
    useContext(FirebaseContext);

  const dates = [];
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date);
  }

  const dateOptions = {
    month: "numeric",
    day: "2-digit",
  };

  const popupDateOpt = {
    weekday: "long",
    month: "numeric",
    day: "2-digit",
  };

  return isLoading ? (
    <Loader />
  ) : user ? (
    <main>
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
        {isAdmin ? (
          schedules.map((schedule) => (
            <div className="shifts__row" key={schedule.id}>
              <div
                className="shifts__col shifts__col--user"
                key={schedule.userId}
              >
                {userData
                  .filter((user) => user.id === schedule.userId)
                  .map((user) => user.name)}
              </div>
              {dates.map((date) => (
                <div className="shifts__col" key={weekdays[date.getDay()]}>
                  <ShiftPopUp
                    className={"shifts__col"}
                    userEmail={user.email}
                    currCell={weekdays[date.getDay()]}
                    currDate={date.toLocaleDateString(undefined, popupDateOpt)}
                    scheduleId={schedule.id}
                    currEmail={userData
                      .filter((u) => u.id === schedule.userId)
                      .map((u) => u.email)
                      .toString()}
                  >
                    {schedule[weekdays[date.getDay()]]}
                  </ShiftPopUp>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div
            className="shifts__row shifts__row--user"
            key={loggedSchedule.id}
          >
            <div
              className="shifts__col shifts__col--user"
              key={loggedSchedule.userId}
            >
              {userData
                .filter((user) => user.id === loggedSchedule.userId)
                .map((user) => user.name)}
            </div>
            {dates.map((date) => (
              <div className="shifts__col" key={weekdays[date.getDay()]}>
                <ShiftPopUp
                  className={"shifts__col"}
                  currCell={weekdays[date.getDay()]}
                  currDate={date.toLocaleDateString(undefined, popupDateOpt)}
                  scheduleId={loggedSchedule.id}
                  currEmail={userData
                    .filter((user) => user.id === loggedSchedule.userId)
                    .map((user) => user.email)
                    .toString()}
                >
                  {loggedSchedule[weekdays[date.getDay()]]}
                </ShiftPopUp>
              </div>
            ))}
          </div>
        )}
      </div>
      {!isAdmin && <RequestPopup className="shifts__btn" />}
    </main>
  ) : (
    <LogIn />
  );
}

export default Shifts;
