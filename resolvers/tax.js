const Tax = require("../models/Tax");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/tax");
//const slugify = require("slugify");

module.exports = {
  Query: {
    tax: async (root, args) => {
      try {
        const tax = await Tax.findOne({});
        if (!tax) {
          throw putError("not found");
        }
        return tax;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    updateGlobalTax: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateGlobalTax", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const tax = await Tax.findOne({});
        tax.global = args.global;
        tax.updated = Date.now();

        await tax.save();
        return await Tax.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateOptionTax: async (root, args, { id }) => {
      checkToken(id);
      try {
        const tax = await Tax.findOne({});
        tax.is_inclusive = args.is_inclusive;
        tax.updated = Date.now();
        await tax.save();
        return await Tax.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    addTaxClass: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addTaxClass", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }
        const tax = await Tax.findOne({});
        tax.tax_class.push(args.tax_class);
        tax.updated = Date.now();
        await tax.save();
        return await Tax.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateTaxClass: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateTaxClass", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const tax = await Tax.findOne({});

        for (let i in tax.tax_class) {
          if (tax.tax_class[i]._id == args._id) {
            tax.tax_class[i] = args;
          }
        }

        tax.tax_class.push(args.tax_class);
        tax.updated = Date.now();
        await tax.save();
        return await Tax.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
