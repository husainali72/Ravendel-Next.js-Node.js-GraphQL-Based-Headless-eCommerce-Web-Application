const Review = require("../models/Review");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const { checkError } = require("../config/helpers");
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
      return await GET_SINGLE_FUNC(args.id, Review, " Review");
    },
    ///let check it...................
    productwisereview: async (root, args) => {
      try {
        const reviews = await Review.find({
          product_id: { $in: args.product_id },
        });
        return reviews || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
  },
  Review: {
    product_id: async (root, args) => {
      return await GET_SINGLE_FUNC(root.product_id, Product, "Product");
    },
    customer_id: async (root, args) => {
      return await GET_SINGLE_FUNC(root.customer_id, Customer, "Customer");
    },
  },
  Mutation: {
    addReview: async (root, args, { id }) => {
      let data = {
        title: args.title,
        review: args.review,
        product_id: args.product_id,
        customer_id: args.customer_id,
        email: args.email,
        rating: args.rating,
        status: args.status,
      };
      let validation = ["review", "title", "email"];
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
      let data = {
        title: args.title,
        review: args.review,
        product_id: args.product_id,
        customer_id: args.customer_id,
        email: args.email,
        rating: args.rating,
        status: args.status,
      };
      let validation = ["review", "title", "email","product_id","customer_id"];
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
