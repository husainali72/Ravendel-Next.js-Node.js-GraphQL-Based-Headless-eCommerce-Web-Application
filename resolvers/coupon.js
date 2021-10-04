const Coupon = require("../models/Coupon");
const { isEmpty, checkError, checkToken } = require("../config/helpers");
const validate = require("../validations/coupon");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");

module.exports = {
  Query: {
    coupons: async (root, args) => {
      return await GET_ALL_FUNC(Coupon, "Coupon");
    },

    coupons_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var searchInFields = { code: { $regex: search, $options: "i" } };

      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Coupon,
        "Coupon"
      );
    },
    coupon: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Coupon, "Coupon");
    },
  },
  Mutation: {
    addCoupon: async (root, args, { id }) => {
      let data = {
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
        exclude_categories: args.exclude_categories,
      };
      return await CREATE_FUNC(id, "Coupon", Coupon, data, "addCoupon");
    },
    updateCoupon: async (root, args, { id }) => {
      let data = {
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
        exclude_categories: args.exclude_categories,
      };
      return await UPDATE_FUNC(
        id,
        "updateCoupon",
        args.id,
        Coupon,
        "Coupon",
        data
      );
    },
    deleteCoupon: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Coupon, "Coupon");
    },
  },
};
