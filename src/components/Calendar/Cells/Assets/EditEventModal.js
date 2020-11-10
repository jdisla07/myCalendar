import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../Modal/Modal";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../../../DatePicker/DatePicker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

EditEventModal.propTypes = {
  event: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  openModal: PropTypes.bool,
};

function EditEventModal({ event, onClose, onSave, onDelete, openModal }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [date, setDate] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    setEventName(event.name);
    setEventDescription(event.description);
    setDate(event.date);
  }, [event]);

  return (
    <Modal
      contentText={`Edit this event on your calendar, please fill out the information about the event.`}
      title={`Edit Event: ${event.name}`}
      open={openModal}
      content={
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DatePicker
              selectedDate={new Date(date)}
              handleDateChange={(date) => {
                setDate(date);
                setDisableButton(false);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Event name"
              value={eventName}
              variant="outlined"
              fullWidth={true}
              onChange={(event) => {
                setEventName(event.target.value);
                setDisableButton(false);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={eventDescription}
              id="outlined-multiline-static"
              label="Description"
              multiline
              fullWidth
              rows={4}
              variant="outlined"
              onChange={(event) => {
                setEventDescription(event.target.value);
                setDisableButton(false);
              }}
            />
          </Grid>
        </Grid>
      }
      actions={
        <React.Fragment>
          <Button
            autoFocus
            onClick={onClose}
            variant={"contained"}
            color="default"
          >
            Close
          </Button>
          <Button
            autoFocus
            onClick={() => onDelete(event.id)}
            variant={"contained"}
            color="secondary"
          >
            Delete
          </Button>
          <Button
            disabled={disableButton}
            autoFocus
            onClick={() => {
              onSave(event.id, eventName, eventDescription, date);
              setDisableButton(true);
            }}
            variant={"contained"}
            color="primary"
          >
            Save
          </Button>
        </React.Fragment>
      }
    />
  );
}

export default EditEventModal;
