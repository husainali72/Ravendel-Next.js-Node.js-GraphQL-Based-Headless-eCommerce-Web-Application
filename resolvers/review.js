const Review = require("../models/Review");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const {
  DELETE_FUNC,
  GET_BY_PAGINATIONS,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
  CREATE_FUNC,
  UPDATE_FUNC,
} = require("../config/api_functions");
const {
  MESSAGE_RESPONSE,
  duplicateData,
  toObjectID
} = require('../config/helpers');

module.exports = {
  Query: {
    reviews: async (root, args) => {
      return await GET_ALL_FUNC(Review, "Reviews");
    },

    reviews_pagination: async (
      root,
      { limit, pageNumber, search, orderBy, order }
    ) => {
      let searchInFields = { review: { $regex: `${search}`, $options: "i" } };
      return await GET_BY_PAGINATIONS(
        limit,
        pageNumber,
        orderBy,
        order,
        searchInFields,
        Review,
        "Reviews"
      );
    },
    review: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Review, "Review");
    },
    ///let check it...................
    productwisereview: async (root, args) => {
      let {productId, page, limit} = args
      page = page || 1
      limit = limit || 10
      if (!productId) {
        return MESSAGE_RESPONSE("ID_ERROR", "Review", false);
      }
      try {
        const pipeline = [
          {
            $match: {
              productId: toObjectID(productId),
              status: "approved",
            },
          },
          {
            $sort: {
              updated: -1,
            },
          },
          {
            $group: {
              _id: null,
              count: {
                $sum: 1
              },
              reviews: {
                $push: "$$ROOT"
              }
            }
          },
          {
            $project: {
              _id: 0,
              count: 1,
              reviews: {
                $slice: ["$reviews", (page - 1) * limit, limit]
              }
            }
          }
        ]
        const existingReviews = await Review.aggregate(pipeline);

        return existingReviews[0] || []
      }
      catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Review", false);
      }
    },
  },
  Review: {
    productId: async (root, args) => {
      if (!root.productId) {
        return MESSAGE_RESPONSE("ID_ERROR", "Review", false);
      }
      try {
        const product = await Product.findById(root.productId);
        // console.log("product found", product)
        if(product) return product
        return MESSAGE_RESPONSE("RESULT_FOUND", "Review", true);
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Review", false);
      }
    },
    customerId: async (root, args) => {
      if (!root.customerId) {
        return MESSAGE_RESPONSE("ID_ERROR", "Review", false);
      }
      try {
        const customer = await Customer.findById(root.customerId);
        if(customer) return customer
        return MESSAGE_RESPONSE("RESULT_FOUND", "Review", true);
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Review", false);
      }
    },
  },
  Mutation: {
    addReview: async (root, args, { id }) => {
      let data = {
        title: args.title,
        review: args.review,
        productId: args.productId,
        customerId: args.customerId,
        email: args.email,
        rating: args.rating,
        status: args.status,
      };
      let validation = ["title", "rating", "review", "email"];
      const duplicate = await duplicateData({review: args.review, customerId: args.customerId, productId: args.productId}, Review)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Review", false);
      return await CREATE_FUNC(
        id,
        "Review",
        Review,
        data,
        args,
        "",
        validation,
        Product
      );
    },
    updateReview: async (root, args, { id }) => {
      console.log(args)
      let data = {
        title: args.title,
        review: args.review,
        productId: args.productId,
        customerId: args.customerId,
        email: args.email,
        rating: args.rating,
        status: args.status,
      };
      let validation = ["title", "rating", "review", "email", "productId", "customerId",];
      if(Number(args.rating) === 0) return MESSAGE_RESPONSE("InvalidField", "Rating", false);
      const duplicate = await duplicateData({review: args.review, customerId: args.customerId, productId: args.productId}, Review, args.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Review", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        Review,
        "Review",
        data,
        "",
        args,
        validation,
        Product
      );
    },
    deleteReview: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Review, "Review");
    },
  },
};
