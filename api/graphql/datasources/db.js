const events = [
  {
    id: "1",
    name: "Meeting 10am",
    description: "Listing",
    date: "Mon Nov 09 2020 00:00:00",
  },
  {
    id: "2",
    name: "Meeting 11am",
    description: "See project details",
    date: "Sun Dec 08 2020 00:00:00",
  },
  {
    id: "3",
    name: "Meeting 12pm",
    description: "Talk to Luis",
    date: "Tue Nov 10 2020 00:00:00",
  },
];

const findByMonth = (date) => {
  let dateToWork = new Date(date);

  return events.filter((event) => {
    let eventDate = new Date(event.date);
    if (
      eventDate.getFullYear() === dateToWork.getFullYear() &&
      eventDate.getMonth() === dateToWork.getMonth()
    ) {
      return event;
    }
  });
};

const create = (input) => {
  let id = events.length + 1;
  let eventCreated = {
    id: id.toString(),
    name: input.name,
    description: input.description,
    date: input.date,
  };
  events.push(eventCreated);
  return eventCreated;
};

const update = (id, input) => {
  let objIndex = events.findIndex((eventData) => eventData.id === id);
  if (input.name) {
    events[objIndex].name = input.name;
  }
  if (input.description) {
    events[objIndex].description = input.description;
  }
  if (input.date) {
    events[objIndex].date = input.date;
  }
  return events[objIndex];
};

const deleteById = (id) => {
  let objIndex = events.findIndex((eventData) => eventData.id === id);
  events.splice(objIndex, 1);
  return true;
};

module.exports = {
  events,
  findByMonth,
  create,
  update,
  deleteById,
};
