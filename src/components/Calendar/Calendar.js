import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import WeekDays from "./WeekDays/WeekDays";
import Cell from "./Cells/Cell";
import { useSelector, useDispatch } from "react-redux";
import { moveToMonth, moveToYear } from "../../actions/";
import { useApolloClient, gql, useMutation } from "@apollo/client";
import CustomSnackBar from "../SnackBar/CustomSnackBar";
import "./Calendar.css";

const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(id: $id)
  }
`;

const UPDATE_EVENT = gql`
  mutation updateEvent($id: ID!, $input: MutationInput) {
    updateEvent(id: $id, input: $input) {
      id
      name
      description
      date
    }
  }
`;

const GET_EVENTS = gql`
  query getEventsOfMonth($date: Date!) {
    events(date: $date) {
      id
      name
      description
      date
    }
  }
`;

const CREATE_EVENT = gql`
  mutation createEvent($input: MutationInput!) {
    createEvent(input: $input) {
      id
      name
      description
      date
    }
  }
`;

Calendar.propTypes = {};

function Calendar() {
  const [events, setEvents] = useState([]);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const currentDate = useSelector((state) => state.dateReducer);
  const dispatch = useDispatch();
  const [selectedDate] = useState(new Date());
  const [trigger, setTrigger] = useState(false);

  const client = useApolloClient();

  const [createEventMutation] = useMutation(CREATE_EVENT);
  const [updateEventMutation] = useMutation(UPDATE_EVENT);
  const [deleteEventMutation] = useMutation(DELETE_EVENT);

  useEffect(() => {
    client
      .query({ query: GET_EVENTS, variables: { date: currentDate } })
      .then((queryResult) => {
        setEvents(queryResult.data.events);
      });
  }, [client, currentDate, trigger]);

  const setYearFun = (year) => {
    dispatch(moveToYear(year));
  };
  const setMonthFun = (month) => {
    dispatch(moveToMonth(month));
  };

  const handleSnackBar = (message) => {
    setOpenSnackBar(true);
    setSnackBarMessage(message);
  };

  const createEvent = (date, name, desc) => {
    createEventMutation({
      variables: {
        input: {
          name: name,
          description: desc,
          date: date,
        },
      },
    })
      .then((r) => {
        let eventsAux = Array.from(events);
        eventsAux.push(r.data.createEvent);
        setEvents(eventsAux);
        handleSnackBar("Successfully created your event");
      })
      .catch(() => {
        handleSnackBar("Error while creating your event");
      });
  };

  const updateEvent = (id, name, desc, date) => {
    updateEventMutation({
      variables: {
        id: id,
        input: {
          name: name,
          description: desc,
          date: date,
        },
      },
    })
      .then(() => {
        setTrigger(!trigger);
        handleSnackBar("Updated event successfully");
      })
      .catch(() => {
        handleSnackBar("Error while updating your event");
      });
  };

  const deleteEvent = (id) => {
    deleteEventMutation({
      variables: {
        id: id,
      },
    })
      .then(() => {
        setTrigger(!trigger);
        handleSnackBar("Deleted event successfully");
      })
      .catch(() => {
        handleSnackBar("Error while deleting your event");
      });
  };

  return (
    <div className="calendar">
      <Header setYear={setYearFun} setMonth={setMonthFun} />
      <WeekDays />
      <Cell
        events={events}
        selectedDate={selectedDate}
        onSave={(date, name, desc) => createEvent(date, name, desc)}
        onUpdate={(id, name, desc, date) => updateEvent(id, name, desc, date)}
        onDelete={(id) => deleteEvent(id)}
      />
      <CustomSnackBar
        open={openSnackBar}
        message={snackBarMessage}
        onClose={() => setOpenSnackBar(false)}
      />
    </div>
  );
}

export default Calendar;
