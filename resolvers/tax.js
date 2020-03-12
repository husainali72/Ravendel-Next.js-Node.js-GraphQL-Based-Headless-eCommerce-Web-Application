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
        const errors = validate("updateGlobalTax", args.global);
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
        const errors = validate("addTaxClass", args.tax_class);
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
        const errors = validate("updateTaxClass", args.tax_class);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const tax = await Tax.findOne({});

        for (let i in tax.tax_class) {
          if (tax.tax_class[i]._id == args.tax_class._id) {
            tax.tax_class[i] = args.tax_class;
            break;
          }
        }

        //tax.tax_class.push(args.tax_class);
        tax.updated = Date.now();
        await tax.save();
        return await Tax.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteTaxClass: async (root, args, { id }) => {
      checkToken(id);
      try {
        const tax = await Tax.findOne({});

        var TaxClass = [...tax.tax_class];

        for (let i in TaxClass) {
          if (TaxClass[i]._id == args._id) {
            delete TaxClass[i];
            break;
          }
        }

        tax.tax_class = TaxClass;
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
