const Review = require("../models/Review");
const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken
} = require("../config/helpers");
const validate = require("../validations/review");

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
          product_id: { $in: args.product_id }
        });
        return reviews || [];
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    }
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
          status: args.status
        });

        await newReview.save();
        return await Review.find({});
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
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
          return await Review.find({});
        } else {
          throw putError("Review not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteReview: async (root, args, { id }) => {
      checkToken(id);
      try {
        const review = await Review.findByIdAndRemove(args.id);
        if (review) {
          const reviews = await Review.find({});
          return reviews || [];
        }
        throw putError("Review not exist");
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  }
};
