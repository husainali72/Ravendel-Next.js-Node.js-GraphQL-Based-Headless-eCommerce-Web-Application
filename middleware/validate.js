const { check } = require("express-validator");

module.exports = function validate(method) {
  switch (method) {
    case "company": {
      return [
        check("name", "name is required")
          .not()
          .isEmpty(),
        check("email", "Invalid email")
          .exists()
          .isEmail(),
        check("password", "password is required")
          .not()
          .isEmpty()
      ];
    }
  }
};
