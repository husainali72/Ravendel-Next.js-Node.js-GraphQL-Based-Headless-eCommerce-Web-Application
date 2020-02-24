const Checkout = require("../models/Checkout");
const {
  isEmpty,
  putError,
  checkError,
  checkToken
} = require("../config/helpers");
//const validate = require("../validations/cart");

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
        const checkout = await Checkout.findOne({ user_id: args.user_id });
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
          user_id: args.user_id,
          products: args.products
        });

        return await newCheckout.save();
      } catch (error) {
        console.log(error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteCheckout: async (root, args, { id }) => {
      checkToken(id);
      const checkout = await Checkout.findByIdAndRemove(args.id);
      if (checkout) {
        return true;
      }
      return false;
    }
  }
};
