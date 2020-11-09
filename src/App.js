import React, { useState } from "react";
// import { addDays } from "date-fns";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
// const today = new Date("Sun Nov 08 2020 00:00:00");

const App = () => {
  const [eventsState, setEventsState] = useState([]);
  const onCellClick = (date, eventName, eventDescription) => {
    console.log("Date " + date);
    console.log(eventName);
    console.log(eventDescription);
    let vents = eventsState;
    vents.push({
      id: "8" + eventName,
      name: eventName,
      description: eventDescription,
      date: date,
    });
    setEventsState(vents);
  };
  return (
    <div>
      <Calendar onCellClick={onCellClick} />
    </div>
  );
};
export default App;
