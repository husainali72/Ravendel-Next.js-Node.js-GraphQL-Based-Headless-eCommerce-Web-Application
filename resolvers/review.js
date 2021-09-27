const Review = require("../models/Review");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
} = require("../config/helpers");
const validate = require("../validations/review");
const errorRES = require("../error");

module.exports = {
  Query: {
    reviews: async (root, args) => {
      try {
        const reviews = await Review.find({});
        return reviews || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    // get all reviews with pagination.............................

    reviews_pagination: async (
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
      ] = await Review.aggregate([
        {
          $match: {
            $or: [
              { review: { $regex: search, $options: "i" } },
             //{ "customer_id.first_name": { $regex: search, $options: "i" } },
              // { product_id: { $regex: search, $options: "i" } },
            ],
          },
        },
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
          meta_data: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: `${errorRES.RETRIEVE_ERROR} review`, status: 200 },
        };
      } else {
        return {
          pagination: { totalCount: total, page: pageNumber },
          data: edges,
          message: { message: "reviews list fetched", status: 200 },
        };
      }
    },
    review: async (root, args) => {
      try {
        const review = await Review.findById(args.id);
        if (!review) {
          throw putError("Review not found");
        }
        return review;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
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
      try {
        const product = await Product.findById(root.product_id);
        return product || {};
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    customer_id: async (root, args) => {
      try {
        const customer = await Customer.findById(root.customer_id);
        return customer || {};
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
  },
  Mutation: {
    addReview: async (root, args, { id }) => {
      //checkToken(id);
      try {
        // Check Validation
        const errors = validate("addReview", args);
        if (!isEmpty(errors)) {
          throw putError(errors);
        }

        const newReview = new Review({
          title: args.title,
          review: args.review,
          product_id: args.product_id,
          customer_id: args.customer_id,
          email: args.email,
          rating: args.rating,
          status: args.status,
        });

        await newReview.save();
        //return await Review.find({});
        return { message: "Review saved successfully", status: 200 };
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.CREATE_ERROR} review`, status: 400 };
      }
    },
    updateReview: async (root, args, { id }) => {
      checkToken(id);
      try {
        const review = await Review.findById({ _id: args.id });
        if (review) {
          // Check Validation
          const errors = validate("updateReview", args);
          if (!isEmpty(errors)) {
            throw putError(errors);
          }

          review.title = args.title;
          review.review = args.review;
          review.product_id = args.product_id;
          review.customer_id = args.customer_id;
          review.email = args.email;
          review.rating = args.rating;
          review.status = args.status;
          review.updated = Date.now();

          await review.save();
          //return await Review.find({});
          return { message: "Review updated successfully", status: 200 };
        } else {
          throw putError("Review not exist");
        }
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.UPDATE_ERROR} review`, status: 400 };
      }
    },
    deleteReview: async (root, args, { id }) => {
      checkToken(id);
      try {
        const review = await Review.findByIdAndRemove(args.id);
        if (review) {
          // const reviews = await Review.find({});
          // return reviews || [];
          return { message: "Review deleted successfully", status: 200 };

        }
        throw putError("Review not exist");
      } catch (error) {
        error = checkError(error);
        return { message: `${errorRES.DELETE_ERROR} review`, status: 400 };
      }
    },
  },
};
