const ProductAttribute = require("../models/ProductAttribute");
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
    product_attributes: async (root, args) => {
      return await GET_ALL_FUNC(ProductAttribute, "ProductAttribute");
    },

    productAttribute_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: search, $options: "i" } };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        ProductAttribute,
        "ProductAttributes"
      );
    },
    product_attribute: async (root, args) => {
      return await GET_SINGLE_FUNC(
        args.id,
        ProductAttribute,
        "ProductAttribute"
      );
    },
  },
  Mutation: {
    addAttribute: async (root, args, { id }) => {
      let data = {
        name: args.name,
        values: args.values,
      };
      let validation = ["name"];
      return await CREATE_FUNC(
        id,
        "ProductAttribute",
        ProductAttribute,
        data,
        args,
        "",
        validation
      );
    },
    updateAttribute: async (root, args, { id }) => {
      let data = {
        name: args.name,
        values: args.values,
      };
      return await UPDATE_FUNC(
        id,
        args.id,
        ProductAttribute,
        "ProductAttribute",
        data,
        "",
        args
      );
    },
    deleteAttribute: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, ProductAttribute, "ProductAttribute");
    },
  },
};
