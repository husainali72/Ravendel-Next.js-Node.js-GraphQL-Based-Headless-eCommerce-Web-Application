const Coupon = require("../models/Coupon");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/coupon");

module.exports = {
  Query: {
    coupons: async (root, args) => {
      try {
        const coupons = await Coupon.find({});
        return coupons || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    coupon: async (root, args) => {
      try {
        const coupon = await Coupon.findById(args.id);
        if (!coupon) {
          throw putError("Coupon not found");
        }
        return coupon;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addCoupon: async (root, args, { id }) => {
      checkToken(id);
      try {
        // Check Validation
        const errors = validate("addCoupon", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const coupon = await Coupon.findOne({ code: args.code });

        if (coupon) {
          throw putError("Coupon code already exist.");
        } else {
          const newCoupon = new Coupon({
            code: args.code,
            description: args.description,
            discount_type: args.discount_type,
            discount_value: args.discount_value,
            free_shipping: args.free_shipping,
            expire: args.expire,
            minimum_spend: args.minimum_spend,
            maximum_spend: args.maximum_spend,
            products: args.products,
            exclude_products: args.exclude_products,
            categories: args.categories,
            exclude_categories: args.exclude_categories
          });

          await newCoupon.save();
          return await Coupon.find({});
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateCoupon: async (root, args, { id }) => {
      checkToken(id);
      try {
        const coupon = await Coupon.findById({ _id: args.id });
        if (coupon) {
          // Check Validation
          const errors = validate("updateCoupon", args);
          if (!isEmpty(errors)) {
            throw putError(errors);
          }

          coupon.code = args.code;
          coupon.description = args.description;
          coupon.discount_type = args.discount_type;
          coupon.discount_value = args.discount_value;
          coupon.free_shipping = args.free_shipping;
          coupon.expire = args.expire;
          coupon.minimum_spend = args.minimum_spend;
          coupon.maximum_spend = args.maximum_spend;
          coupon.products = args.products;
          coupon.exclude_products = args.exclude_products;
          coupon.categories = args.categories;
          coupon.exclude_categories = args.exclude_categories;
          coupon.updated = Date.now();

          await coupon.save();
          return await Coupon.find({});
        } else {
          throw putError("Coupon not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteCoupon: async (root, args, { id }) => {
      checkToken(id);
      try {
        const coupon = await Coupon.findByIdAndRemove(args.id);
        if (coupon) {
          const coupons = await Coupon.find({});
          return coupons || [];
        }
        throw putError("customer not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
