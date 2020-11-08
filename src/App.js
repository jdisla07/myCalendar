import React, {useState} from "react";
import {addDays} from 'date-fns'
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
const today = new Date("Sun Nov 08 2020 00:00:00");
const events = [
  {
    id:"1",
    name:"Meeting 10am",
    description:"detalles de compras",
    date: today
  },
  {
    id:"2",
    name:"Meeting 10am",
    description:"detalles de compras",
    date: addDays(today,1)
  },
  {
    id:"3",
    name:"Meeting 10am",
    description:"detalles de compras",
    date: addDays(today,3)
  }
]
const App = () => {
  const [eventsState, setEventsState] = useState(events)
  const onCellClick = (date, eventName, eventDescription) => {
    console.log("Date " + date);
    console.log(eventName);
    console.log(eventDescription);
    let vents = eventsState
    vents.push({
      id:"8"+eventName,
      name:eventName,
      description: eventDescription,
      date: date
    })
    setEventsState(vents)
  };
  return (
    <div>
      <Calendar events={eventsState} onCellClick={onCellClick} />
    </div>
  );
};
export default App;
