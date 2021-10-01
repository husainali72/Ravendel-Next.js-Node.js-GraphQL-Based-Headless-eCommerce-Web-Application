const Coupon = require("../models/Coupon");
const {
  isEmpty,
  checkError,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/coupon");
const Messages = require("../config/messages");

module.exports = {
  Query: {
    coupons: async (root, args) => {
      try {
        const coupons = await Coupon.find({});
        return {
          message: {
            message: Messages.RESULT_FOUND.replace(":item", "Coupon"),
            success: true,
          },
          data: coupons,
        };
      } catch (error) {
        return {
          message: {
            message: Messages.RETRIEVE_ERROR.replace(":item", "Coupon"),
            success: false,
          },
        };
      }
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
          message: {
            message: Messages.RETRIEVE_ERROR.replace(":item", "Coupon"),
            success: false,
          },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: {
            message: Messages.RESULT_FOUND.replace(":item", "Coupon"),
            success: true,
          },
        };
      }
    },
    coupon: async (root, args) => {
      if (!args.id) {
        return {
          message: {
            message: Messages.ID_ERROR.replace(":item", "Coupon"),
            success: false,
          },
        };
      }
      try {
        const coupon = await Coupon.findById(args.id);
        if (!coupon) {
          return {
            message: {
              message: Messages.NOT_EXIST.replace(":item", "Coupon"),
              success: false,
            },
          };
        }
        return {
          message: {
            message: Messages.RESULT_FOUND.replace(":item", "Coupon"),
            success: true,
          },
          data: coupon,
        };
      } catch (error) {
        error = checkError(error);
        return {
          message: {
            message: Messages.RETRIEVE_ERROR.replace(":item", "Coupon"),
            success: false,
          },
        };
      }
    }
  },
  Mutation: {
    addCoupon: async (root, args, { id }) => {
      if (!id) {
        return {
          message: Messages.TOKEN_REQ.replace(":item", "Coupon"),
          success: false,
        };
      }
      checkToken(id);
      try {
        const errors = validate("addCoupon", args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const coupon = await Coupon.findOne({ code: args.code });

        if (coupon) {
          return {
            message: Messages.DUPLICATE.replace(":item", "CouponCode"),
            success: false,
          };
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
          return {
            message: Messages.AddSuccess.replace(":item", "Coupon"),
            success: true,
          };
        }
      } catch (error) {
        return {
          message: Messages.CREATE_ERROR.replace(":item", "Coupon"),
          success: false,
        };
      }
    },
    updateCoupon: async (root, args, { id }) => {
      if (!id) {
        return {
          message: Messages.TOKEN_REQ.replace(":item", "Coupon"),
          success: false,
        };
      }
      checkToken(id);
      if (!args.id) {
        return {
          message: Messages.ID_ERROR.replace(":item", "Coupon"),
          success: false,
        };
      }
      try {
        const coupon = await Coupon.findById({ _id: args.id });
        if (coupon) {
          const errors = validate("updateCoupon", args);
          if (!isEmpty(errors)) {
            return {
              message: errors,
              success: false,
            };
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
          return {
            message: Messages.UpdateSuccess.replace(":item", "Coupon"),
            success: true,
          };
        } return {
          message: Messages.NOT_EXIST.replace(":item", "Coupon"),
          success: false,
        };
      } catch (error) {
       error = checkError(error);
       return {
        message: Messages.UPDATE_ERROR.replace(":item", "Coupon"),
        success: false,
      };
      }
    },
    deleteCoupon: async (root, args, { id }) => {
      if (!id) {
        return {
          message: Messages.TOKEN_REQ.replace(":item", "Coupon"),
          success: false,
        };
      }
      checkToken(id);
      if (!args.id) {
        return {
          message: Messages.ID_ERROR.replace(":item", "Coupon"),
          success: false,
        };
      }
      try {
        const coupon = await Coupon.findByIdAndRemove(args.id);
        if (coupon) {
          return {
            message: Messages.DELETE.replace(":item", "Coupon"),
            success: true,
          };
        }
        return {
          message: Messages.NOT_EXIST.replace(":item", "Coupon"),
          success: false,
        };
      } catch (error) {
        error = checkError(error);
        return {
          message: Messages.DELETE_ERROR.replace(":item", "Coupon"),
          success: false,
        };
      }
    }
  }
};
