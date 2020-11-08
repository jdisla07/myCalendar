import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import Modal from "../../Modal/Modal";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../../DatePicker/DatePicker";
import Button from "@material-ui/core/Button";

Cell.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onCellClick: PropTypes.func.isRequired,
};

function Cell({ currentDate, selectedDate, onCellClick }) {
  const [openModal, setOpenModal] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`column cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate)
              ? "selected"
              : ""
          }`}
          key={day}
          onClick={() => {
            setOpenModal(true);
            setPickedDate(cloneDay);
          }}
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
          <Button size="small" variant="outlined">
            Small
          </Button>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {" "}
        {days}{" "}
      </div>
    );
    days = [];
  }
  return (
    <React.Fragment>
      <Modal
        contentText={
          "Create events on your calendar, please fill out the information about the event."
        }
        title={"Create Event"}
        onSave={() => {
          onCellClick(pickedDate, eventName, eventDescription)
        }}
        onClose={() => setOpenModal(false)}
        open={openModal}
        content={
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DatePicker
                selectedDate={pickedDate}
                handleDateChange={(date) => setPickedDate(date)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event name"
                variant="outlined"
                fullWidth={true}
                onChange={(event)=> setEventName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                defaultValue=""
                variant="outlined"
                onChange={(event)=> setEventDescription(event.target.value)}
              />
            </Grid>
          </Grid>
        }
      />
      <div className="body">{rows}</div>
    </React.Fragment>
  );
}

export default Cell;
