import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "../../../Modal/Modal";
import Grid from "@material-ui/core/Grid";
import DatePicker from "../../../DatePicker/DatePicker";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { gql, useMutation } from '@apollo/client';

CreateEventModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  pickedDate: PropTypes.instanceOf(Date),
};

function CreateEventModal({ openModal, onSave, onClose, pickedDate }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [dateChanged, setDateChanged] = useState(null);

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
              label="Event name"
              variant="outlined"
              fullWidth={true}
              onChange={(event) => setEventName(event.target.value)}
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
              onChange={(event) => setEventDescription(event.target.value)}
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
            onClick={() =>
              onSave(
                dateChanged ? dateChanged : pickedDate,
                eventName,
                eventDescription
              )
            }
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
