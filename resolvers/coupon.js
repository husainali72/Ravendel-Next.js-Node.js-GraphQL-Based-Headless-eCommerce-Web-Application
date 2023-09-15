const Coupon = require("../models/Coupon");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const { duplicateData, MESSAGE_RESPONSE } = require("../config/helpers");

module.exports = {
  Query: {
    coupons: async (root, args) => {
      return await GET_ALL_FUNC(Coupon, "Coupon");
    },

    coupons_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      var searchInFields = { code: { $regex: `${search}`, $options: "i" } };

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
        discountType: args.discountType,
        discountValue: args.discountValue,
        freeShipping: args.freeShipping,
        expire: args.expire,
        minimumSpend: args.minimumSpend,
        maximumSpend: args.maximumSpend,
        product: args.product,
        includeProducts: args.includeProducts,
        excludeProducts: args.excludeProducts,
        category: args.category,
        includeCategories: args.includeCategories,
        excludeCategories: args.excludeCategories,
      };
      let validation = ["code", "expire"];
      const duplicate = await duplicateData({code: data.code}, Coupon)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Coupon Code", false);
      return await CREATE_FUNC(
        id,
        "Coupon",
        Coupon,
        data,
        args,
        "",
        validation,
      );
    },
    updateCoupon: async (root, args, { id }) => {
      let data = {
        code: args.code,
        description: args.description,
        discountType: args.discountType,
        discountValue: args.discountValue,
        freeShipping: args.freeShipping,
        expire: args.expire,
        minimumSpend: args.minimumSpend,
        maximumSpend: args.maximumSpend,
        product: args.product,
        includeProducts: args.includeProducts,
        excludeProducts: args.excludeProducts,
        category: args.category,
        includeCategories: args.includeCategories,
        excludeCategories: args.excludeCategories,
      };
      let validation = ["code", "expire"];
      const duplicate = await duplicateData({code: data.code }, Coupon, args.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Coupon Code", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        Coupon,
        "Coupon",
        data,
        '',
        args,
        validation
      );
    },
    deleteCoupon: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Coupon, "Coupon");
    },
  },
};
