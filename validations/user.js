const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addUser": {
      let errors = "";
      args.name = args.name || "";
      args.email = args.email || "";
      args.password = args.password || "";
      args.role = args.role || "";

      if (Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (Validator.isEmpty(args.email)) {
        return (errors = "Email field is required");
      }

      if (!Validator.isEmail(args.email)) {
        return (errors = "Email is invalid");
      }

      if (Validator.isEmpty(args.password)) {
        return (errors = "Password field is required");
      }

      if (Validator.isEmpty(args.role)) {
        return (errors = "Role field is required");
      }
      break;
    }
    case "updateUser": {
      let errors = "";
      args.name = args.name || "";
      args.email = args.email || "";
      args.role = args.role || "";

      if (Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (Validator.isEmpty(args.email)) {
        return (errors = "Email field is required");
      }

      if (!Validator.isEmail(args.email)) {
        return (errors = "Email is invalid");
      }

      if (Validator.isEmpty(args.role)) {
        return (errors = "Role field is required");
      }
      break;
    }
  }
};
