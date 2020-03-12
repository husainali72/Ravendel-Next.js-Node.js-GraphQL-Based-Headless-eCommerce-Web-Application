const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addPage": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (!args.description || Validator.isEmpty(args.description)) {
        return (errors = "Description field is required");
      }

      if (!args.status || Validator.isEmpty(args.status)) {
        return (errors = "Status field is required");
      }
      break;
    }
  }
};
