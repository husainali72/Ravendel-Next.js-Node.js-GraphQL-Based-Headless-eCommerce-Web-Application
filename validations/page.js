const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addPage": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }
      break;
    }
    case "updatePage": {
      let errors = "";
      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }
      break;
    }
  }
};
