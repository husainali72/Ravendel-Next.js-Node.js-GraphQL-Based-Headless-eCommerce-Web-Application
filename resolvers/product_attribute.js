const ProductAttribute = require("../models/ProductAttribute");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const {duplicateData,MESSAGE_RESPONSE} = require("../config/helpers")

module.exports = {
  Query: {
    productAttributes: async (root, args) => {
      return await GET_ALL_FUNC(ProductAttribute, "Product Attribute");
    },

    productAttribute_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { name: { $regex: `${search}`, $options: "i" } };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        ProductAttribute,
        "Product Attributes"
      );
    },
    productAttribute: async (root, args) => {
      return await GET_SINGLE_FUNC(
        args.id,
        ProductAttribute,
        "Product Attribute"
      );
    },
  },
  Mutation: {
    addAttribute: async (root, args, { id }) => {
      console.log(args)
      let data = {
        name: args.attribute.name,
        values: args.attribute.values,
        allow_filter: args.attribute.allow_filter,
      };
      const duplicate = await duplicateData({name: args.name}, ProductAttribute)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Product Attribute", false);
      let validation = ["name"];

      for(let i of data.values){
        if(/^[a-zA-Z0-9\s]*$/.test(i.name) && i.name.trim() !== ''){
          continue;
        }
        return MESSAGE_RESPONSE("Custom", "Attributes can only contain letters, numbers, and spaces", false);
      }

      return await CREATE_FUNC(
        id,
        "Product Attribute",
        ProductAttribute,
        data,
        args,
        "",
        validation
      );
    },
    updateAttribute: async (root, args, { id }) => {
      let data = {
        name: args.attribute.name,
        values: args.attribute.values,
        allow_filter: args.attribute.allow_filter,
      };
      const duplicate = await duplicateData({name: args.name}, ProductAttribute, args.attribute.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Product Attribute", false);
      return await UPDATE_FUNC(
        id,
        args.attribute.id,
        ProductAttribute,
        "Product Attribute",
        data,
        "",
        args
      );
    },
    deleteAttribute: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, ProductAttribute, "Product Attribute");
    },
  },
};
