const Shipping = require("../models/Shipping");
const Product = require("../models/Product");
const { isEmpty, MESSAGE_RESPONSE,_validate } = require("../config/helpers");

module.exports = {
  Query: {
    shipping: async (root, args) => {
      try {
        const shipping = await Shipping.findOne({});
        if (!shipping) {
          return {
            message: MESSAGE_RESPONSE("NOT_EXIST", "shipping", false),
          };
        }
        return {
          message: MESSAGE_RESPONSE("RESULT_FOUND", "shipping", true),
          data: shipping,
        };
      } catch (error) {
        return {
          message: MESSAGE_RESPONSE("RETRIEVE_ERROR", "shipping", false),
        };
      }
    },
  },
  Mutation: {
    updateGlobalShipping: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Global Shipping", false);
      }
      try {
        // Check Validation
        /* const errors = validate("updateGlobalShipping", args.global);
        if (!isEmpty(errors)) {
          throw putError(errors);
        } */

        const shipping = await Shipping.findOne({});
        shipping.global = args.global;
        shipping.updated = Date.now();
        await shipping.save();

        if (args.global.is_global && args.global.overwrite) {
          await Product.updateMany(
            {},
            {
              $set: { "shipping.shippingClass": args.global.shippingClass },
            }
          );
        }
        return MESSAGE_RESPONSE("UpdateSuccess", "Global Shipping", true);
      } catch (error) {
        console.log(error)
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Global Shipping", false);
      }
    },
    addShippingClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Shipping Class", false);
      }
      try {
        const errors = _validate(["name", "amount"], args.shippingClass);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const shipping = await Shipping.findOne({});
        const result = shipping.shippingClass.map(shipping=>{
          if(shipping.name.toLowerCase() === args.shippingClass.name.toLowerCase() ){
            return false
          } else return true
        })
        if(result.includes(false)) return MESSAGE_RESPONSE("DUPLICATE", "Shipping", false)
        shipping.shippingClass.push(args.shippingClass);
        shipping.updated = Date.now();
        await shipping.save();
        await Shipping.findOne({});
        return MESSAGE_RESPONSE("AddSuccess", "Shipping Class", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Shipping Class", false);
      }
    },
    updateShippingClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Shipping Class", false);
      }
      try {
        const errors = _validate(["name"], args.shippingClass);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const shipping = await Shipping.findOne({});
        const result = shipping.shippingClass.map(shipping=>{
          if((shipping.name.toLowerCase() === args.shippingClass.name.toLowerCase() 
          ) && 
            shipping._id.toString() !== args.shippingClass._id.toString()){
            return false
          } else return true
        })
        console.log(result)
        if(result.includes(false)) return MESSAGE_RESPONSE("DUPLICATE", "Shipping", false)
        for (let i in shipping.shippingClass) {
          if (shipping.shippingClass[i]._id == args.shippingClass._id) {
            shipping.shippingClass[i] = args.shippingClass;
            break;
          }
        }

        //tax.taxClass.push(args.taxClass);
        shipping.updated = Date.now();
        await shipping.save();
        // await Shipping.findOne({});
        return MESSAGE_RESPONSE("UpdateSuccess", "Shipping Class", true);
      } catch (error) {
        console.log('err', error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Shipping Class", false);
      }
    },
    deleteShippingClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Shipping Class", false);
      }
      try {
        const shipping = await Shipping.findOne({});
        console.log(shipping)

        var ShippingClass = shipping.shippingClass;
        // for (let i in ShippingClass) {
        //   if (ShippingClass[i]._id == args._id) {
        //     console.log('Matched')
        //     delete ShippingClass[i];
        //     break;
        //   }else {
        //     console.log('Not Matched')
        //   }
        // }
        let balanceShipping = ShippingClass.filter(ship => ship._id != args._id);
        shipping.shippingClass = balanceShipping;
        shipping.updated = Date.now();
        await shipping.save();
        // await Shipping.findOne({});
        return MESSAGE_RESPONSE("DELETE", "Shipping Class", true);
      } catch (error) {
        console.log('delete', error)
        return MESSAGE_RESPONSE("DELETE_ERROR", "Shipping Class", false);
      }
    },
  },
};
