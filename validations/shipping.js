const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "updateGlobalShipping": {
      let errors = "";

      /* if (Validator.isBoolean(args.is_global)) {
        return (errors = "Global is required");
      } */

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name is required");
      }

      if (!args.amount || Validator.isEmpty(args.amount)) {
        return (errors = "Amount is required");
      }

      break;
    }
    case "addShippingClass": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name is required");
      }

      if (isEmpty(args.amount)) {
        return (errors = "Amount is required");
      }

      break;
    }
    case "updateShippingClass": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name is required");
      }

      if (isEmpty(args.amount)) {
        return (errors = "Amount is required");
      }

      break;
    }
  }
};
