const { Analytic } = require("../models/Analytic");

const { MESSAGE_RESPONSE } = require("../config/helpers");

module.exports = {
  Query: {
    events: async (root, args) => {
      const events = await Analytic.find().lean({})

      return events
    },
  },
  Mutation: {
    addLog: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Analytic", false);
      }

      const { IP, customerId, event, from, data } = args;
      const newLog = await Analytic.create(args)

      return MESSAGE_RESPONSE("AddSuccess", "Log", true);
    },
  },
};
