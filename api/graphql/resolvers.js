const db = require("./datasources/db");
const Query = {
  allEvents: () => db.events,
  events: (parent, args) => {
    return db.findByMonth(args.date);
  },
};

const Mutation = {
  createEvent: async (_, { input }) => {
    return db.create(input);
  },
  updateEvent: async (_, { id, input }) => {
    return db.update(id, input);
  },
  deleteEvent: async (_, { id }) => {
    return db.deleteById(id);
  },
};

module.exports = {
  Query,
  Mutation,
};
