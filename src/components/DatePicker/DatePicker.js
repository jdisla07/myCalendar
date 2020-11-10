import "date-fns";
import React, { useState } from "react";
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
  const [date, setDate] = useState(selectedDate);

  return (
    <MuiPickersUtilsProvider utils={DateMomentUtils}>
      <KeyboardDatePicker
        variant="inline"
        format="MMMM Do yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={date}
        onChange={(date) => {
          setDate(date);
          handleDateChange(date.toDate());
        }}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
export default DatePicker;
