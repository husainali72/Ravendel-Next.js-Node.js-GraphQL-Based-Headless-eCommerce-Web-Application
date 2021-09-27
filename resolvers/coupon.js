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
const errorRES = require("../error");

module.exports = {
  Query: {
    coupons: async (root, args) => {
      try {
        const coupons = await Coupon.find({});
        return coupons || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }a
    },
    // get all coupons with pagination................

    coupons_pagination : async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var sort = orderBy ? orderBy : "_id";
      var sortDirection = order === "DESC" ? -1 : 1;
      const [
        {
          total: [total = 0],
          edges,
        },
      ] = await Coupon.aggregate([
        {
          $match: { code: { $regex: search, $options: "i" } },
        },
        {
          $facet: {
            total: [{ $group: { _id: null, count: { $sum: 1 } } }],
            edges: [
              { $sort: { [sort]: sortDirection } },
              { $skip: limit * (pageNumber - 1) },
              { $limit: limit },
            ],
          },
        },
        {
          $project: {
            total: "$total.count",
            edges: "$edges",
          },
        },
      ]);
      if (!edges.length) {
        return {
          meta_data: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: `${errorRES.RETRIEVE_ERROR} coupon`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "Coupons list fetched", status: 200 },
        };
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
          //return await Coupon.find({});
          return { message: "Coupon saved successfully", status: 200 };
        }
      } catch (error) {
        //error = checkError(error);
        return { message: `${errorRES.CREATE_ERROR} Coupon`, status: 400 };
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
         // return await Coupon.find({});
         return { message: "Coupon updated successfully", status: 200 };
        } else {
          //throw putError("Coupon not exist");
          return { message: "Coupon not exist", status: 400 };
        }
      } catch (error) {
        // error = checkError(error);
        return { message: `${errorRES.UPDATE_ERROR} Coupon`, status: 400 };
      }
    },
    deleteCoupon: async (root, args, { id }) => {
      checkToken(id);
      try {
        const coupon = await Coupon.findByIdAndRemove(args.id);
        if (coupon) {
          // const coupons = await Coupon.find({});
          // return coupons || [];
          return { message: "Coupon deleted successfully", status: 200 };
        }
        throw putError("customer not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.DELETE_ERROR} Coupon`, status: 404 };
      }
    }
  }
};
