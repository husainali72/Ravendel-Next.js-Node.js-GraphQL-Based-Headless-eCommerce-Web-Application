const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addBrand": {
      let errors = "";

      if (!Array.isArray(args.brands) || !args.brands.length) {
        return (errors = "Name is required");
      }

      break;
    }
    case "updateBrand": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (!args.url && Validator.isEmpty(args.url)) {
        return (errors = "URL field is required");
      }

      //args.name = Validator.escape(args.name);

      break;
    }
  }
};
