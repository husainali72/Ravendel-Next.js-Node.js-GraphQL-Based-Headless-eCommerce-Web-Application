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
              $set: { taxClass: args.global.taxClass },
            }
          );
        }
        return MESSAGE_RESPONSE("UpdateSuccess", "Global Tax", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Global Tax", false);
      }
    },
    updateOptionTax: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Tax Option", false);
      }
      try {
        const tax = await Tax.findOne({});
        tax.is_inclusive = args.is_inclusive;
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "Tax Option", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Tax Option", false);
      }
    },
    addTaxClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Tax Class", false);
      }
      try {
        const errors = _validate(["name", "percentage"], args.taxClass);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const tax = await Tax.findOne({});
        let result = tax.taxClass.map(tax=>{
          if(tax.name.toLowerCase() === args.taxClass.name.toLowerCase() 
          ){
            return false
          }
          else return true
        })
        if(result.includes(false)) return MESSAGE_RESPONSE("DUPLICATE", "Tax", false)
        tax.taxClass.push(args.taxClass);
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("AddSuccess", "Tax Class", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Tax Class", false);
      }
    },
    updateTaxClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Tax Class", false);
      }
      try {
        const errors = _validate(["name"], args.taxClass);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const tax = await Tax.findOne({});
        let result = tax.taxClass.map(tax=>{
          if((tax.name.toLowerCase() === args.taxClass.name.toLowerCase() ) &&
            tax._id.toString() !== args.taxClass._id.toString()){
            return false
          }
          else return true
        })
        if(result.includes(false)) return MESSAGE_RESPONSE("DUPLICATE", "Tax", false)
        for (let i in tax.taxClass) {
          if (tax.taxClass[i]._id == args.taxClass._id) {
            tax.taxClass[i] = args.taxClass;
            break;
          }
        }
        // tax.taxClass.push(args.taxClass);
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("UpdateSuccess", "Tax Class", true);
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Tax Class", false);
      }
    },
    deleteTaxClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Tax Class", false);
      }
      try {
        const tax = await Tax.findOne({});

        var TaxClass = [...tax.taxClass];

        for (let i in TaxClass) {
          if (TaxClass[i]._id == args._id) {
            delete TaxClass[i];
            break;
          }
        }

        tax.taxClass = TaxClass;
        tax.updated = Date.now();
        await tax.save();
        return MESSAGE_RESPONSE("DELETE", "Tax Class", true);
      } catch (error) {
        return MESSAGE_RESPONSE("DELETE_ERROR", "Tax Class", false);
      }
    },
  },
};
