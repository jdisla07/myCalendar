import React from "react";

import "./App.css";
import Calendar from "./components/Calendar/Calendar";

const App = () => {
  const onCellClick = (date, eventName, eventDescription) => {
    console.log("Date " + date);
    console.log(eventName);
    console.log(eventDescription);
  };
  return (
    <div>
      <Calendar onCellClick={onCellClick} />
    </div>
  );
};
export default App;
