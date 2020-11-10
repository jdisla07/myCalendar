import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../Modal/Modal";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../../../DatePicker/DatePicker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

CreateEventModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  pickedDate: PropTypes.instanceOf(Date),
};

function CreateEventModal({ openModal, onSave, onClose, pickedDate }) {
  const [eventName, setEventName] = useState(null);
  const [eventDescription, setEventDescription] = useState(null);
  const [dateChanged, setDateChanged] = useState(null);
  const [disableButton, setDisableButton] = useState(true);

  const checkFields = () => {
    if (eventName && eventDescription) {
      setDisableButton(false);
    }
  };
  return (
    <Modal
      contentText={
        "Create events on your calendar, please fill out the information about the event."
      }
      title={"Create Event"}
      open={openModal}
      content={
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DatePicker
              selectedDate={pickedDate}
              handleDateChange={(date) => setDateChanged(date)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Event name"
              variant="outlined"
              fullWidth={true}
              onChange={(event) => {
                setEventName(event.target.value);
                checkFields();
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              required
              fullWidth
              rows={4}
              defaultValue=""
              variant="outlined"
              onChange={(event) => {
                setEventDescription(event.target.value);
                checkFields();
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
            disabled={disableButton}
            onClick={() => {
              onSave(
                dateChanged ? dateChanged : pickedDate,
                eventName,
                eventDescription
              );
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

export default CreateEventModal;
