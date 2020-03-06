const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "updateGlobalTax": {
      let errors = "";
      if (!args.global && !Object.keys(args.global).length) {
        return (errors = "All field required");
      }

      if (!args.is_global && Validator.isBoolean(args.is_global)) {
        return (errors = "Global is required");
      }

      if (!args.name && Validator.isEmpty(args.name)) {
        return (errors = "Name is required");
      }

      if (!args.percentage && Validator.isEmpty(args.percentage)) {
        return (errors = "Percentage is required");
      }

      break;
    }
    case "addTaxClass": {
      let errors = "";

      if (!args.name && Validator.isEmpty(args.name)) {
        return (errors = "Name is required");
      }

      if (!args.percentage && Validator.isEmpty(args.percentage)) {
        return (errors = "Percentage is required");
      }

      break;
    }
    case "updateTaxClass": {
      let errors = "";

      if (!args.name && Validator.isEmpty(args.name)) {
        return (errors = "Name is required");
      }

      if (!args.percentage && Validator.isEmpty(args.percentage)) {
        return (errors = "Percentage is required");
      }

      break;
    }
  }
};
