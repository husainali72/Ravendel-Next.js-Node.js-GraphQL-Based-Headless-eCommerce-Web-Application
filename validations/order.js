const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  let errors = "";
  if (!args) {
    return (errors = "Something went wrong.");
  }

  if (!args.status || Validator.isEmpty(args.slug)) {
    return (errors = "Status field is required");
  }

  if (!args.billing) {
    return (errors = "Billing details are is required");
  }

  if (!args.shipping) {
    return (errors = "Shipping details are is required");
  }

  switch (method) {
    case "updateOrder": {
      if (
        !args.billing.firstname &&
        Validator.isEmpty(args.billing.firstname)
      ) {
        return (errors = "Billing's First Name field is required");
      }
      if (!args.billing.lastname && Validator.isEmpty(args.billing.lastname)) {
        return (errors = "Billing's Last Name field is required");
      }

      if (!args.billing.company && Validator.isEmpty(args.billing.company)) {
        return (errors = "Billing's Company field is required");
      }

      if (!args.billing.address && Validator.isEmpty(args.billing.address)) {
        return (errors = "Billing's Address field is required");
      }

      if (!args.billing.city && Validator.isEmpty(args.billing.city)) {
        return (errors = "Billing's City field is required");
      }

      if (!args.billing.zip && Validator.isEmpty(args.billing.zip)) {
        return (errors = "Billing's Zip field is required");
      }

      if (!args.billing.country && Validator.isEmpty(args.billing.country)) {
        return (errors = "Billing's Country field is required");
      }

      if (!args.billing.state && Validator.isEmpty(args.billing.state)) {
        return (errors = "Billing's State field is required");
      }

      if (!args.billing.email && Validator.isEmpty(args.billing.email)) {
        return (errors = "Billing's Email field is required");
      }

      if (!Validator.isEmail(args.billing.email)) {
        return (errors = "Email is invalid");
      }

      if (!args.billing.phone && Validator.isEmpty(args.billing.phone)) {
        return (errors = "Billing's Phone field is required");
      }

      if (
        !args.billing.payment_method &&
        Validator.isEmpty(args.billing.payment_method)
      ) {
        return (errors = "Billing's Payment Method field is required");
      }

      if (
        !args.billing.transaction_id &&
        Validator.isEmpty(args.billing.transaction_id)
      ) {
        return (errors = "Billing's Transaction field is required");
      }

      if (
        !args.shipping.firstname &&
        Validator.isEmpty(args.shipping.firstname)
      ) {
        return (errors = "Shipping's First Name field is required");
      }

      if (
        !args.shipping.lastname &&
        Validator.isEmpty(args.shipping.lastname)
      ) {
        return (errors = "Shipping's Last Name field is required");
      }

      if (!args.shipping.company && Validator.isEmpty(args.shipping.company)) {
        return (errors = "Shipping's Company field is required");
      }

      if (!args.shipping.address && Validator.isEmpty(args.shipping.address)) {
        return (errors = "Shipping's Address field is required");
      }

      if (!args.shipping.city && Validator.isEmpty(args.shipping.city)) {
        return (errors = "Shipping's City field is required");
      }

      if (!args.shipping.zip && Validator.isEmpty(args.shipping.zip)) {
        return (errors = "Shipping's Zip field is required");
      }

      if (!args.shipping.country && Validator.isEmpty(args.shipping.country)) {
        return (errors = "Shipping's Country field is required");
      }

      if (!args.shipping.state && Validator.isEmpty(args.shipping.state)) {
        return (errors = "Shipping's State field is required");
      }
      break;
    }
  }
};
