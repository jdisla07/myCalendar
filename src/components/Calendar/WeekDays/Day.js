import React from "react";
import PropTypes from "prop-types";
import { addDays, format, startOfWeek } from "date-fns";

Day.propTypes = {
  currentDate: PropTypes.object,
};

function Day({ currentDate }) {
  const dateFormat = "EEE";
  const days = [];
  let startDate = startOfWeek(currentDate);
  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="column col-center" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }
  return <div className="days row">{days}</div>;
}

export default Day;
