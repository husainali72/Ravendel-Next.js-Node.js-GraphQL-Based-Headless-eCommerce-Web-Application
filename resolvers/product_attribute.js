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
const errorRES = require("../error");


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
          message: { message:  `${errorRES.RETRIEVE_ERROR} productAttribute`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "productAttribute List", status: 200 },
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
        return { message: " Attribute saved successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.CREATE_ERROR} productAttribute`, status: 400 };
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
          return { message: "Attribute updated successfully", status: 200 };
        } else {
          return { message: "Attribute not exist", status: 404 };
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.UPDATE_ERROR} ProductAttribute`, status: 400 };
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
          return { message: "Attribute deleted successfully", status: 200 };
        }
        throw putError("Attribute not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.DELETE_ERROR} ProductAttribute`, status: 404 };
      }
    },
  },
};
