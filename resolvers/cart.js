const Cart = require("../models/Cart");
const { isEmpty, putError, checkError } = require("../config/helpers");
const validate = require("../validations/cart");

module.exports = {
  Query: {
    carts: async (root, args) => {
      try {
        return await Cart.find({});
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    cart: async (root, args) => {
      try {
        const cart = await Cart.findById(args.id);
        if (!cart) {
          throw putError("Cart not found");
        }
        return cart;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    cartbyUser: async (root, args) => {
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        if (!cart) {
          throw putError("Cart not found");
        }
        return cart;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addCart: async (root, args) => {
      try {
        const cart = await Cart.findOne({ user_id: args.user_id });
        if (cart) {
          cart.total = args.total;
          cart.products.unshift(args.product);
          cart.updated = Date.now();
          return await cart.save();
        }

        const newCart = new Cart({
          user_id: args.user_id,
          total: args.total
        });

        newCart.products.unshift(args.product);
        return await newCart.save();
      } catch (error) {
        console.log(error);
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    updateCart: async (root, args) => {
      try {
        const cart = await Cart.findById({ _id: args.id });
        if (cart) {
          cart.total = args.total;
          cart.products = args.products;
          cart.updated = Date.now();
          return await cart.save();
        } else {
          throw putError("Cart not exist");
        }
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteCart: async (root, args) => {
      const cart = await Cart.findByIdAndRemove(args.id);
      if (cart) {
        return true;
      }
      return false;
    },
    deleteCartProduct: async (root, args) => {
      const cart = await Cart.findById(args.id);
      if (cart) {
        for (let i in cart.products) {
          if (cart.products[i].id === args.object_id) {
            cart.products.splice(i, 1);
            cart.updated = Date.now();
            return await cart.save();
          }
        }
      } else {
        throw putError("Cart not exist");
      }
    }
  }
};
