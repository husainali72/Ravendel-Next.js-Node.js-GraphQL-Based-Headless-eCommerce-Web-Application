const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addCustomer": {
      let errors = "";

      if (!args.first_name || Validator.isEmpty(args.first_name)) {
        return (errors = "First Name field is required");
      }

      if (!args.last_name || Validator.isEmpty(args.last_name)) {
        return (errors = "Last Name field is required");
      }

      if (!args.email || Validator.isEmpty(args.email)) {
        return (errors = "Email field is required");
      }

      if (!Validator.isEmail(args.email)) {
        return (errors = "Email is invalid");
      }

      if (!args.password || Validator.isEmpty(args.password)) {
        return (errors = "Password field is required");
      }
      break;
    }
    case "updateCustomer": {
      let errors = "";

      if (!args.first_name || Validator.isEmpty(args.first_name)) {
        return (errors = "First Name field is required");
      }

      if (!args.last_name || Validator.isEmpty(args.last_name)) {
        return (errors = "Last Name field is required");
      }

      if (!args.email || Validator.isEmpty(args.email)) {
        return (errors = "Email field is required");
      }

      if (!Validator.isEmail(args.email)) {
        return (errors = "Email is invalid");
      }

      if (!args.password || Validator.isEmpty(args.password)) {
        return (errors = "Password field is required");
      }
      break;
    }
    case "addAddressBook": {
      let errors = "";
      if (!args.first_name || Validator.isEmpty(args.first_name)) {
        return (errors = "First Name field is required");
      }

      if (!args.last_name || Validator.isEmpty(args.last_name)) {
        return (errors = "Last Name field is required");
      }

      if (!args.address_line1 || Validator.isEmpty(args.address_line1)) {
        return (errors = "Address Line 1 field is required");
      }

      if (!args.city || Validator.isEmpty(args.city)) {
        return (errors = "City field is required");
      }

      if (!args.country || Validator.isEmpty(args.country)) {
        return (errors = "Country field is required");
      }

      if (!args.pincode || Validator.isEmpty(args.pincode)) {
        return (errors = "Pincode field is required");
      }

      break;
    }
    case "updateAddressBook": {
      let errors = "";

      if (!args.first_name || Validator.isEmpty(args.first_name)) {
        return (errors = "First Name field is required");
      }

      if (!args.last_name || Validator.isEmpty(args.last_name)) {
        return (errors = "Last Name field is required");
      }

      if (!args.address_line1 || Validator.isEmpty(args.address_line1)) {
        return (errors = "Address Line 1 field is required");
      }

      if (!args.city || Validator.isEmpty(args.city)) {
        return (errors = "City field is required");
      }

      if (!args.country || Validator.isEmpty(args.country)) {
        return (errors = "Country field is required");
      }

      if (!args.pincode || Validator.isEmpty(args.pincode)) {
        return (errors = "Pincode field is required");
      }

      break;
    }
  }
};
