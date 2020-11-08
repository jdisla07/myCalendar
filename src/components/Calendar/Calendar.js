import React, { useState } from "react";
import { addMonths, addYears, subMonths, subYears } from "date-fns";
import Header from "./Header/Header";
import Day from "./WeekDays/Day";
import Cell from "./Cells/Cell";
import PropTypes from "prop-types";

Calendar.propTypes = {
  onCellClick: PropTypes.func.isRequired,
};

function Calendar({ onCellClick }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate] = useState(new Date());

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };
  const prevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  return (
    <React.Fragment>
      <div className="calendar">
        <div>
          <Header
            nextYear={nextYear}
            prevYear={prevYear}
            currentDate={currentDate}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
          />
        </div>
        <div>
          <Day currentDate={currentDate} />
        </div>
        <div>
          <Cell
            currentDate={currentDate}
            selectedDate={selectedDate}
            onCellClick={onCellClick}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Calendar;
