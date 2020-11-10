import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateMomentUtils from "@date-io/moment";
import PropTypes from "prop-types";

YearPicker.propTypes = {
  onDateChange: PropTypes.func,
  label: PropTypes.string.isRequired,
  view: PropTypes.oneOf(["year", "month"]),
};

function YearPicker({ onDateChange, label, view }) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
      <DatePicker
        disableToolbar={view === "month"}
        variant="inline"
        inputVariant="outlined"
        views={[view]}
        label={label}
        format={view === "month" ? "MMMM" : "YYYY"}
        value={selectedDate}
        onChange={(value) => {
          handleDateChange(value);
          onDateChange(value);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}

export default YearPicker;
