const Shipping = require("../models/Shipping");
const Product = require("../models/Product");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/shipping");
//const slugify = require("slugify");

module.exports = {
  Query: {
    shipping: async (root, args) => {
      try {
        const shipping = await Shipping.findOne({});
        if (!shipping) {
          throw putError("not found");
        }
        return shipping;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    updateGlobalShipping: async (root, args, { id }) => {
      checkToken(id);
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
              $set: { "shipping.shipping_class": args.global.shipping_class }
            }
          );
        }

        return await Shipping.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    addShippingClass: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addShippingClass", args.shipping_class);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }
        const shipping = await Shipping.findOne({});
        shipping.shipping_class.push(args.shipping_class);
        shipping.updated = Date.now();
        await shipping.save();
        return await Shipping.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateShippingClass: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("updateShippingClass", args.shipping_class);
        if (!isEmpty(errors)) {
          throw putError(errors);
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
        return await Shipping.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteShippingClass: async (root, args, { id }) => {
      checkToken(id);
      try {
        const shipping = await Shipping.findOne({});

        var ShippingClass = [...shipping.shipping_class];

        for (let i in ShippingClass) {
          if (ShippingClass[i]._id == args._id) {
            delete ShippingClass[i];
            break;
          }
        }

        shipping.shipping_class = ShippingClass;
        shipping.updated = Date.now();
        await shipping.save();
        return await Shipping.findOne({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
