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

    productAttribute_pagination: async (
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
      ] = await ProductAttribute.aggregate([
        { $match: { name: { $regex: search, $options: "i" } } },
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

      if (edges == null) {
        return new Error(errorName.NOT_FOUND);
      } else {
        return {
          meta_data: { totalCount: total, page: pageNumber },
          data: edges,
        };
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
