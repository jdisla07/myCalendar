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
  isWeekend,
} from "date-fns";
import Button from "@material-ui/core/Button";
import CreateEventModal from "./Assets/CreateEventModal";
import EditEventModal from "./Assets/EditEventModal";
import "./Cell.css";
import { useSelector } from "react-redux";

Cell.propTypes = {
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  events: PropTypes.array,
};

function Cell({ selectedDate, onSave, onUpdate, onDelete, events }) {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [pickedDate, setPickedDate] = useState(null);
  const [eventEdit, setEventId] = useState({});
  const currentDate = useSelector((state) => state.dateReducer);

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
      let style = {};
      if (isWeekend(cloneDay)) {
        style = {
          background: "whitesmoke",
        };
      }
      days.push(
        <div
          className={`column cell ${
            !isSameMonth(day, monthStart) ? "disabled" : ""
          }`}
          style={style}
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
          <React.Fragment>
            {events.map((eventData) => (
              <React.Fragment key={eventData.id}>
                {new Date(eventData.date).getTime() === cloneDay.getTime() && (
                  <Button
                    className="text-overflow"
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
    </React.Fragment>
  );
}

export default Cell;
