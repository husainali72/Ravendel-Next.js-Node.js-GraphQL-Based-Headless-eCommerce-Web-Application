const ProductAttribute = require("../models/ProductAttribute");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const { duplicateData, MESSAGE_RESPONSE } = require("../config/helpers");

const validateAndCheckDuplicates = (values) => {
  const uniqueNames = new Set();

  for (const value of values) {
    const trimmedName = value.name?.trim();

    // Check for valid characters and non-empty names
    if (!/^[a-zA-Z0-9\s]*$/.test(trimmedName) || !trimmedName) {
      return {
        success: false,
        message: "Attributes can only contain letters, numbers, and spaces",
      };
    }

    // Check for duplicates in values
    if (uniqueNames.has(trimmedName.toLowerCase())) {
      return {
        success: false,
        message: `Duplicate attribute value: ${trimmedName}`,
      };
    }

    uniqueNames.add(trimmedName.toLowerCase());
  }

  return { success: true };
};
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
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Product Attribute", false);
      }

      const data = {
        name: args.attribute.name,
        values: args.attribute.values,
        allow_filter: args.attribute.allow_filter,
      };

      if (!data.values || data.values.length === 0) {
        return MESSAGE_RESPONSE("Custom", "tags cannot be empty", false);
      }

      // Check for duplicate entry in database
      const isDuplicate = await duplicateData(
        { name: data.name },
        ProductAttribute
      );
      if (isDuplicate) {
        return MESSAGE_RESPONSE("DUPLICATE", "Product Attribute", false);
      }

      // Validate and check for duplicates within attribute values
      const validationResponse = validateAndCheckDuplicates(data.values);
      if (!validationResponse.success) {
        return MESSAGE_RESPONSE("Custom", validationResponse.message, false);
      }

      try {
        // Use the `CREATE_FUNC` utility to save the data
        return await CREATE_FUNC(
          id,
          "Product Attribute",
          ProductAttribute,
          data,
          args,
          "",
          ["name"]
        );
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Product Attribute", false);
      }
    },
    updateAttribute: async (root, args, { id }) => {
      // Prepare the data object for the update
      const data = {
        name: args.attribute.name,
        values: args.attribute.values,
        allow_filter: args.attribute.allow_filter,
      };

      if (!data.values || data.values.length === 0) {
        return MESSAGE_RESPONSE("Custom", "tags cannot be empty", false);
      }

      // Check for duplicate name in database, excluding the current attribute ID
      const isDuplicate = await duplicateData(
        { name: data.name },
        ProductAttribute,
        args.attribute.id
      );
      if (isDuplicate) {
        return MESSAGE_RESPONSE("DUPLICATE", "Product Attribute", false);
      }

      // Validate and check for duplicates within attribute values
      const validationResponse = validateAndCheckDuplicates(data.values);
      if (!validationResponse.success) {
        return MESSAGE_RESPONSE("Custom", validationResponse.message, false);
      }

      try {
        // Update the product attribute using `UPDATE_FUNC`
        return await UPDATE_FUNC(
          id,
          args.attribute.id,
          ProductAttribute,
          "Product Attribute",
          data,
          "",
          args
        );
      } catch (error) {
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Product Attribute", false);
      }
    },
    deleteAttribute: async (root, args, { id }) => {
      return await DELETE_FUNC(
        id,
        args.id,
        ProductAttribute,
        "Product Attribute"
      );
    },
  },
};
