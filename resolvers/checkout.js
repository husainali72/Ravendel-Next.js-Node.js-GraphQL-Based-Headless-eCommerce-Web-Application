const Checkout = require("../models/Checkout");
const {
  isEmpty,
  putError,
  checkError,
  checkToken
} = require("../config/helpers");
//const validate = require("../validations/cart");
const mongoose = require('mongoose');
module.exports = {
  Query: {
    checkouts: async (root, args) => {
      try {
        return await Checkout.find({});
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    checkout: async (root, args) => {
      try {
        const checkout = await Checkout.findById(args.id);
        if (!checkout) {
          throw putError("not found");
        }
        return checkout;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    checkoutbyUser: async (root, args) => {
      try {
        const checkout = await Checkout.findOne({ userId:new mongoose.Types.ObjectId(args.userId) });
        if (!checkout) {
          throw putError("Cart not found");
        }
        return checkout;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addCheckout: async (root, args, { id }) => {
      checkToken(id);
      try {
        const newCheckout = new Checkout({
          userId: args.userId,
          products: args.products
        });

        return await newCheckout.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteCheckout: async (root, args, { id }) => {
      checkToken(id);
      const checkout = await Checkout.deleteOne({_id:args.id});
      if (checkout) {
        return true;
      }
      return false;
    }
  }
};
