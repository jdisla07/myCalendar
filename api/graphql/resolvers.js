const db = require("./datasources/db");
const Query = {
  allEvents: () => db.events,
  events: (parent, args) => {
    return db.findByMonth(args.date);
  },
};

const Mutation = {
  createEvent: (_, { input }) => {
    return db.create(input);
  },
  updateEvent: (_, { id, input }) => {
    return db.update(id, input);
  },
  deleteEvent: (_, { id }) => {
    return db.deleteById(id);
  },
};

module.exports = {
  Query,
  Mutation,
};
