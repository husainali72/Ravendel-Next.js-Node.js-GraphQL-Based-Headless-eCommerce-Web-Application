const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addFaq": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }

      if (!args.content || Validator.isEmpty(args.content)) {
        return (errors = "Content field is required");
      }
      //args.title = Validator.escape(args.title);
      break;
    }
    case "updateFaq": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }

      if (!args.content || Validator.isEmpty(args.content)) {
        return (errors = "Content field is required");
      }
      break;
    }
    
    
  }
};
