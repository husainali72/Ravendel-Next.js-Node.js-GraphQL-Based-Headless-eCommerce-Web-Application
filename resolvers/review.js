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
  duplicateData
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
      let searchInFields = { review: { $regex: search, $options: "i" } };
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
      // console.log("Productwisereview===", args.product_id)
      if (!args.product_id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Review", false);
      }
      try {
        const reviews = await Review.find({
          product_id: { $in: args.product_id },
          status: "approved"
        });
        //console.log("review", reviews);

        // return MESSAGE_RESPONSE("RESULT_FOUND", "Review", true);

        return {
          message: {
            message: "All review are fetched",
            success: true
          },
          data: reviews,
        }
      }
      catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Review", false);
      }
    },
  },
  Review: {
    product_id: async (root, args) => {
      // console.log("Product", root)
      if (!root.product_id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Review", false);
      }
      try {
        const product = await Product.findById(root.product_id);
        // console.log("product found", product)
        if(product) return product
        return MESSAGE_RESPONSE("RESULT_FOUND", "Review", true);
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Review", false);
      }
    },
    customer_id: async (root, args) => {
      if (!root.product_id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Review", false);
      }
      try {
        const customer = await Customer.findById(root.customer_id);
        if(customer) return customer
        return MESSAGE_RESPONSE("RESULT_FOUND", "Review", true);
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Review", false);
      }
    },
  },
  Mutation: {
    addReview: async (root, args, { id }) => {
      //console.log("addReview")
      let data = {
        title: args.title,
        review: args.review,
        product_id: args.product_id,
        customer_id: args.customer_id,
        email: args.email,
        rating: args.rating,
        status: args.status,
      };
      //console.log("data==", data)
      let validation = ["review", "title", "email"];
      const duplicate = await duplicateData({review: args.review, customer_id: args.customer_id}, Review)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Review", false);
      return await CREATE_FUNC(
        id,
        "Review",
        Review,
        data,
        args,
        "",
        validation
      );
    },
    updateReview: async (root, args, { id }) => {
      //console.log(args)
      let data = {
        title: args.title,
        review: args.review,
        product_id: args.product_id,
        customer_id: args.customer_id,
        email: args.email,
        rating: args.rating,
        status: args.status,
      };
      let validation = [
        "review",
        "title",
        "email",
        "product_id",
        "customer_id",
      ];
      const duplicate = await duplicateData({review: args.review, customer_id: args.customer_id}, Review, args.id)
      if(duplicate) return MESSAGE_RESPONSE("DUPLICATE", "Review", false);
      return await UPDATE_FUNC(
        id,
        args.id,
        Review,
        "Review",
        data,
        "",
        args,
        validation
      );
    },
    deleteReview: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Review, "Review");
    },
  },
};
