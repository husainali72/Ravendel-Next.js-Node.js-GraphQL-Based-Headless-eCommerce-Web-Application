const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addBlog": {
      let errors = "";
      args.title = args.title || "";
      /* args.content = args.content || "";
      args.status = args.status || ""; */

      if (Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }

      /* if (Validator.isEmpty(args.description)) {
        return (errors = "Description field is required");
      }

      if (Validator.isEmpty(args.status)) {
        return (errors = "Status field is required");
      } */
      break;
    }
  }
};
