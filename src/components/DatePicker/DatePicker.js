import "date-fns";
import React from "react";
import DateMomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import PropTypes from "prop-types";

DatePicker.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  handleDateChange: PropTypes.func.isRequired,
};

function DatePicker({ selectedDate, handleDateChange }) {
  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MMMM Do yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export default DatePicker;
