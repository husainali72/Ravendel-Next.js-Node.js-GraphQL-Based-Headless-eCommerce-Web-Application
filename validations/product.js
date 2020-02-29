const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addProductCategory": {
      let errors = "";
      args.name = args.name || "";

      if (Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }
      break;
    }
    case "addProduct": {
      let errors = "";
      args.name = args.name || "";
      //args.categoryId = isEmpty(args.categoryId) || [];
      args.slug = args.slug || "";
      args.sku = args.sku || "";
      //args.description = args.description || "";
      args.quantity = args.quantity || "";
      args.pricing = args.pricing || {};

      if (Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (!Array.isArray(args.categoryId) && args.categoryId.length) {
        return (errors = "Category field is required");
      }

      if (Validator.isEmpty(args.sku)) {
        return (errors = "sku field is required");
      }

      if (Validator.isEmpty(args.slug)) {
        return (errors = "URL field is required");
      }

      if (!args.quantity) {
        return (errors = "Quantity field is required");
      }

      if (
        typeof args.pricing != "object" &&
        Object.keys(args.pricing).length != 0
      ) {
        return (errors = "Pricing field is required");
      }

      break;
    }
  }
};
