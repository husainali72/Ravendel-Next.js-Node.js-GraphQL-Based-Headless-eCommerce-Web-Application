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
        return MESSAGE_RESPONSE("TOKEN_REQ", "GlobalShipping", false);
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
              $set: { "shipping.shipping_class": args.global.shipping_class },
            }
          );
        }
        return MESSAGE_RESPONSE("UpdateSuccess", "GlobalShipping", true);
      } catch (error) {
        console.log(error)
        return MESSAGE_RESPONSE("UPDATE_ERROR", "GlobalShipping", false);
      }
    },
    addShippingClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "ShippingClass", false);
      }
      try {
        const errors = _validate(["name", "amount"], args.shipping_class);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        const shipping = await Shipping.findOne({});
        shipping.shipping_class.push(args.shipping_class);
        shipping.updated = Date.now();
        await shipping.save();
        await Shipping.findOne({});
        return MESSAGE_RESPONSE("AddSuccess", "ShippingClass", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "ShippingClass", false);
      }
    },
    updateShippingClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "ShippingClass", false);
      }
      try {
        const errors = _validate(["name", "amount"], args.shipping_class);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const shipping = await Shipping.findOne({});

        for (let i in shipping.shipping_class) {
          if (shipping.shipping_class[i]._id == args.shipping_class._id) {
            shipping.shipping_class[i] = args.shipping_class;
            break;
          }
        }

        //tax.tax_class.push(args.tax_class);
        shipping.updated = Date.now();
        await shipping.save();
        // await Shipping.findOne({});
        return MESSAGE_RESPONSE("UpdateSuccess", "ShippingClass", true);
      } catch (error) {
        console.log('err', error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "ShippingClass", false);
      }
    },
    deleteShippingClass: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "ShippingClass", false);
      }
      try {
        const shipping = await Shipping.findOne({});
        console.log(shipping)

        var ShippingClass = shipping.shipping_class;
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
        shipping.shipping_class = balanceShipping;
        shipping.updated = Date.now();
        await shipping.save();
        // await Shipping.findOne({});
        return MESSAGE_RESPONSE("DELETE", "ShippingClass", true);
      } catch (error) {
        console.log('delete', error)
        return MESSAGE_RESPONSE("DELETE_ERROR", "ShippingClass", false);
      }
    },
  },
};
