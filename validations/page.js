const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addPage": {
      let errors = "";
      args.name = args.name || "";
      args.description = args.description || "";
      args.status = args.status || "";

      if (Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (Validator.isEmpty(args.description)) {
        return (errors = "Description field is required");
      }

      if (Validator.isEmpty(args.status)) {
        return (errors = "Status field is required");
      }
    }
  }
};
