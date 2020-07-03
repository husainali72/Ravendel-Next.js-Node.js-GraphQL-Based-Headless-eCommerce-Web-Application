const ProductAttribute = require("../models/ProductAttribute");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  updateUrl,
} = require("../config/helpers");
//const validate = require("../validations/brand");

module.exports = {
  Query: {
    product_attributes: async (root, args) => {
      try {
        const attributes = await ProductAttribute.find({});
        return attributes || [];
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    product_attribute: async (root, args) => {
      try {
        const attribute = await ProductAttribute.findById(args.id);
        if (!attribute) {
          throw putError("Attribute not found");
        }
        return attribute;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
  Mutation: {
    addAttribute: async (root, args, { id }) => {
      checkToken(id);
      try {
        const attribute = await ProductAttribute.findOne({
          name: args.attribute.name,
        });
        if (attribute) {
          throw putError("Attribute already exist.");
        }

        const newAttribute = new ProductAttribute({
          name: args.attribute.name,
          values: args.attribute.values,
        });

        let attr = await newAttribute.save();

        return {
          id: attr.id,
          success: true,
          message: "Added Successfuly",
        };
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateAttribute: async (root, args, { id }) => {
      checkToken(id);
      try {
        const update_attr = await ProductAttribute.findById({
          _id: args.attribute.id,
        });
        if (update_attr) {
          update_attr.name = args.attribute.name;
          update_attr.values = args.attribute.values;
          await update_attr.save();
          return {
            id: update_attr.id,
            success: true,
            message: "Updated Successfuly",
          };
        } else {
          throw putError("Attribute not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteAttribute: async (root, args, { id }) => {
      checkToken(id);
      try {
        const attribute = await ProductAttribute.findByIdAndRemove(args.id);
        if (attribute) {
          return {
            id: attribute.id,
            success: true,
            message: "Deleted Successfuly",
          };
        }
        throw putError("Attribute not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
  },
};
