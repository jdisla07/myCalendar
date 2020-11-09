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
import Button from "@material-ui/core/Button";
import CreateEventModal from "./Assets/CreateEventModal";
import EditEventModal from "./Assets/EditEventModal";

Cell.propTypes = {
  currentDate: PropTypes.instanceOf(Date),
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  events: PropTypes.array,
};

function Cell({ currentDate, selectedDate, onSave, onUpdate, onDelete, events }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);
  const [eventEdit, setEventId] = useState({});

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
              : ""
          }`}
          key={day}
        >
          <Button
            onClick={() => {
              setOpenModal(true);
              setPickedDate(cloneDay);
            }}
            style={{ justifyContent: "right", height: "20%" }}
            fullWidth
            size="small"
            color={`${
              !isSameMonth(day, monthStart)
                ? "default"
                : isSameDay(day, selectedDate)
                ? "primary"
                : "secondary"
            }`}
            variant="contained"
          >
            {formattedDate}
          </Button>
          {/*<span className="bg">{formattedDate}</span>*/}
          <React.Fragment>
            {events.map((eventData) => (
              <React.Fragment key={eventData.id}>
                {new Date(eventData.date).getTime() === cloneDay.getTime() && (
                  <Button
                    onClick={() => {
                      setOpenModalEdit(true);
                      setEventId(eventData);
                    }}
                    style={{ justifyContent: "right", height: "20%" }}
                    fullWidth
                    size="small"
                    color={"inherit"}
                    variant="contained"
                  >
                    {eventData.name}
                  </Button>
                )}
              </React.Fragment>
            ))}
          </React.Fragment>
          {/*<Button onClick={()=>setOpenModal(true)} style={{justifyContent:"right"}} fullWidth size="small" color={"primary"} variant="contained">*/}
          {/*  {formattedDate}*/}
          {/*  <AddIcon  fontSize={"small"}/>*/}
          {/*</Button>*/}
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
    <div>
      <CreateEventModal
        onClose={() => setOpenModal(false)}
        openModal={openModal}
        onSave={onSave}
        pickedDate={pickedDate}
      />
      <EditEventModal
        onClose={() => setOpenModalEdit(false)}
        event={eventEdit}
        openModal={openModalEdit}
        onSave={onUpdate}
        onDelete={onDelete}
      />
      <div className="body">{rows}</div>
    </div>
  );
}

export default Cell;
