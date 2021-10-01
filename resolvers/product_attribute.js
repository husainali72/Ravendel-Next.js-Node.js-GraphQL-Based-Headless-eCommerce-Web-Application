const ProductAttribute = require("../models/ProductAttribute");
const {
  putError,
  checkError,
  checkToken,
} = require("../config/helpers");
const Messages = require("../config/messages");

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
      if (!edges.length) {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message:  `${Messages.RETRIEVE_ERROR} productAttribute`, success: true },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "productAttribute List", success: true },
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
        return { message: error.custom_message, status: 404 };
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

        // return {
        //   id: attr.id,
        //   success: true,
        //   message: "Added Successfuly",
        // };
        return { message: " Attribute saved successfully", success: true };
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.CREATE_ERROR} productAttribute`, success: false };
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
          // return {
          //   id: update_attr.id,
          //   success: true,
          //   message: "Updated Successfuly",
          // };
          return { message: "Attribute updated successfully", success: true };
        } else {
          return { message: "Attribute not exist", status: 404 };
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.UPDATE_ERROR} ProductAttribute`, success: false };
      }
    },
    deleteAttribute: async (root, args, { id }) => {
      checkToken(id);
      try {
        const attribute = await ProductAttribute.findByIdAndRemove(args.id);
        if (attribute) {
          // return {
          //   id: attribute.id,
          //   success: true,
          //   message: "Deleted Successfuly",
          // };
          return { message: "Attribute deleted successfully", success: true };
        }
        throw putError("Attribute not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${Messages.DELETE_ERROR} ProductAttribute`, status: 404 };
      }
    },
  },
};
