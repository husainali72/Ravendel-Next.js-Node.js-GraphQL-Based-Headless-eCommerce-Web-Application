const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addBlog": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }
      args.title = Validator.escape(args.title);
      break;
    }
    case "updateBlog": {
      let errors = "";

      if (!args.title || Validator.isEmpty(args.title)) {
        return (errors = "Title field is required");
      }
      break;
    }
    case "addBlogTag": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }
      args.name = Validator.escape(args.name);
      break;
    }
    case "updateBlogTag": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }
      args.name = Validator.escape(args.name);
      break;
    }
  }
};
