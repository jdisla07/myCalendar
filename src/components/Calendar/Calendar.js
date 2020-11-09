import React, { useEffect, useState } from "react";
import { addMonths, addYears, subMonths, subYears } from "date-fns";
import Header from "./Header/Header";
import Day from "./WeekDays/Day";
import Cell from "./Cells/Cell";
import PropTypes from "prop-types";
import {useApolloClient, gql, useMutation} from "@apollo/client";

const DELETE_EVENT = gql`
  mutation deleteEvent($id:ID!){
    deleteEvent (id: $id)
  }
`;

const UPDATE_EVENT = gql`
  mutation updateEvent($id:ID! $input:MutationInput){
    updateEvent (id:$id input:$input){
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
  mutation createEvent($input:MutationInput!){
    createEvent (input:$input){
      id
      name
      description
      date
    }
  }
`;

Calendar.propTypes = {
  onCellClick: PropTypes.func.isRequired,
};

function Calendar() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate] = useState(new Date());
  const [trigger, setTrigger] = useState(false)
  const client = useApolloClient();
  const [createEventMutation] = useMutation(CREATE_EVENT)
  const [updateEventMutation] = useMutation(UPDATE_EVENT)
  const [deleteEventMutation] = useMutation(DELETE_EVENT)
  useEffect(() => {
    client
      .query({ query: GET_EVENTS, variables: { date: currentDate } })
      .then((queryResult) => {
        setEvents(queryResult.data.events)
      });
  }, [currentDate, trigger]);

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const nextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };
  const prevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const createEvent =  (date, name, desc) => {
    createEventMutation({
      variables: {
        input: {
          name: name,
          description: desc,
          date: date
        }
      }
    }).then(r => {
      let eventsAux = Array.from(events);
      eventsAux.push(r.data.createEvent)
      setEvents(eventsAux)
    })
  }

  const updateEvent =  (id, name, desc, date) => {
    updateEventMutation({
      variables: {
        id: id,
        input: {
          name: name,
          description: desc,
          date: date
        }
      }
    }).then(() => {
      setTrigger(!trigger)
    })
  }

  const deleteEvent =  (id) => {
    deleteEventMutation({
      variables: {
        id: id,
      }
    }).then(() => {
      setTrigger(!trigger)
    })
  }

  return (
    <React.Fragment>
      <div className="calendar">
        <React.Fragment>
          <Header
            nextYear={nextYear}
            prevYear={prevYear}
            currentDate={currentDate}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
          />
        </React.Fragment>
        <React.Fragment>
          <Day currentDate={currentDate} />
        </React.Fragment>
        <React.Fragment>
          <Cell
            events={events}
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSave={(date,name,desc)=>createEvent(date,name,desc)}
            onUpdate={(id, name, desc,date)=> updateEvent(id, name, desc,date)}
            onDelete={(id)=>deleteEvent(id)}
          />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
}

export default Calendar;
