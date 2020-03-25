const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addReview": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Name field is required");
      }

      if (!args.review || Validator.isEmpty(args.review)) {
        return (errors = "Review field is required");
      }

      if (!args.email || Validator.isEmpty(args.email)) {
        return (errors = "Email field is required");
      }

      if (!Validator.isEmail(args.email)) {
        return (errors = "Email is invalid");
      }

      break;
    }
    case "updateReview": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Name field is required");
      }

      if (!args.product_id || Validator.isEmpty(args.product_id)) {
        return (errors = "Product field is required");
      }

      if (!args.customer_id || Validator.isEmpty(args.customer_id)) {
        return (errors = "Customer field is required");
      }

      if (!args.review || Validator.isEmpty(args.review)) {
        return (errors = "Review field is required");
      }

      if (!args.email || Validator.isEmpty(args.email)) {
        return (errors = "Email field is required");
      }

      if (!Validator.isEmail(args.email)) {
        return (errors = "Email is invalid");
      }
      break;
    }
  }
};
