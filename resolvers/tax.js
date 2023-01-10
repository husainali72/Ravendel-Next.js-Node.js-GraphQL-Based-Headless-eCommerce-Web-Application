const Tax = require("../models/Tax");
const Product = require("../models/Product");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
} = require("../config/helpers");


module.exports = {
  Query: {
    tax: async (root, args) => {
      try {
        const tax = await Tax.findOne({});
        if (!tax) {
          return {
            message: MESSAGE_RESPONSE("NOT_EXIST", "Tax", false),
          };
        }
        return {
          message: MESSAGE_RESPONSE("RESULT_FOUND", "Tax", true),
          data: tax,
        };
      } catch (error) {
        return {
          message: MESSAGE_RESPONSE("RETRIEVE_ERROR", "Tax", false),
        };
      }
    },
  },
  Mutation: {
    updateGlobalTax: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Tax", false);
      }
      try {
        // Check Validation
        /* const errors = validate("updateGlobalTax", args.global);
        if (!isEmpty(errors)) {
          throw putError(errors);
        } */
        const tax = await Tax.findOne({});
        tax.global = args.global;
        tax.updated = Date.now();
        await tax.save();
        if (args.global.is_global && args.global.overwrite) {
          await Product.updateMany(
            {},
            {
              $set: { tax_class: args.global.tax_class },
            }
          );
        }
        return MESSAGE_RESPONSE("UpdateSuccess", "Tax", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Tax", false);
      }
    },
    updateOptionTax: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "OptionTax", false);
      }
      try {
        const tax = await Tax.findOne({});
        tax.is_inclusive = args.is_inclusive;
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "OptionTax", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "OptionTax", false);
      }
    },
    addTaxClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "TaxClass", false);
      }
      try {
        const errors = _validate(["name", "percentage"], args.tax_class);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const tax = await Tax.findOne({});
        let result = tax.tax_class.map(tax=>{
          if(tax.name === args.tax_class.name){
            return false
          }
          else return true
        })
        if(result.includes(false)) return MESSAGE_RESPONSE("DUPLICATE", "Tax", false)
        tax.tax_class.push(args.tax_class);
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("AddSuccess", "TaxClass", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "TaxClass", false);
      }
    },
    updateTaxClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "TaxClass", false);
      }
      try {
        const errors = _validate(["name", "percentage"], args.tax_class);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const tax = await Tax.findOne({});
        let result = tax.tax_class.map(tax=>{
          if(tax.name === args.tax_class.name &&
            tax._id.toString() !== args.tax_class._id.toString()){
            return false
          }
          else return true
        })
        if(result.includes(false)) return MESSAGE_RESPONSE("DUPLICATE", "Tax", false)
        for (let i in tax.tax_class) {
          if (tax.tax_class[i]._id == args.tax_class._id) {
            tax.tax_class[i] = args.tax_class;
            break;
          }
        }
        // tax.tax_class.push(args.tax_class);
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "TaxClass", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "TaxClass", false);
      }
    },
    deleteTaxClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "TaxClass", false);
      }
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
        return MESSAGE_RESPONSE("DELETE", "TaxClass", true);
      } catch (error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "TaxClass", false);
      }
    },
  },
};
