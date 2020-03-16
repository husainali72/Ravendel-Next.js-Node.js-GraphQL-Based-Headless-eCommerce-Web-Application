const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addCoupon": {
      let errors = "";

      if (!args.code || Validator.isEmpty(args.code)) {
        return (errors = "Coupon code field is required");
      }

      if (!args.expire || Validator.isEmpty(args.expire)) {
        return (errors = "Coupon expiry date is required");
      }

      break;
    }
    case "updateCoupon": {
      let errors = "";

      if (!args.code || Validator.isEmpty(args.code)) {
        return (errors = "Coupon code field is required");
      }

      if (!args.expire || Validator.isEmpty(args.expire)) {
        return (errors = "Coupon expiry date is required");
      }
      break;
    }
  }
};
