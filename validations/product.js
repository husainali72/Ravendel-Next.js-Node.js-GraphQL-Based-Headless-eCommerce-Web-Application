const Validator = require("validator");
const isEmpty = require("../config/is-empty");

module.exports = function validate(method, args) {
  switch (method) {
    case "addProductCategory": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }
      break;
    }
    case "updateProductCategory": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }
      break;
    }
    case "addProduct": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (!Array.isArray(args.categoryId) || !args.categoryId.length) {
        return (errors = "Category field is required");
      }

      if (!args.sku || Validator.isEmpty(args.sku)) {
        return (errors = "sku field is required");
      }

      if (!args.quantity) {
        return (errors = "Quantity field is required");
      }

      if (args.custom_field.length) {
        if (args.custom_field.some((field) => isEmpty(field.key))) {
          return (errors = "Please fill all custom field");
        }
      }
      /*  if (
        typeof args.pricing != "object" ||
        !Object.keys(args.pricing).length
      ) {
        return (errors = "Pricing field is required");
      } */

      console.log(args.shipping);

      if (!args.shipping || !args.shipping.shipping_class) {
        return (errors = "Please select Shipping class");
      }

      /* if (!args.tax || !args.tax.tax_class) {
        return (errors = "Please select Tax class");
      } */

      break;
    }
    case "updateProduct": {
      let errors = "";

      if (!args.name || Validator.isEmpty(args.name)) {
        return (errors = "Name field is required");
      }

      if (!Array.isArray(args.categoryId) || !args.categoryId.length) {
        return (errors = "Category field is required");
      }

      if (!args.sku || Validator.isEmpty(args.sku)) {
        return (errors = "sku field is required");
      }

      if (!args.quantity) {
        return (errors = "Quantity field is required");
      }

      if (args.custom_field.length) {
        if (args.custom_field.some((field) => isEmpty(field.key))) {
          return (errors = "Please fill all custom field");
        }
      }

      /* if (
        typeof args.pricing != "object" ||
        Object.keys(args.pricing).length != 0
      ) {
        return (errors = "Pricing field is required");
      } */

      if (!args.shipping || !args.shipping.shipping_class) {
        return (errors = "Please select Shipping class");
      }

      /* if (!args.tax || !args.tax.tax_class) {
        return (errors = "Please select Tax class");
      } */

      break;
    }
  }
};
