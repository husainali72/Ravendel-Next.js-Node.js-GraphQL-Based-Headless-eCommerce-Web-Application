const Order = require("../models/Order");
const { isEmpty, putError, checkError } = require("../config/helpers");

module.exports = {
  Query: {
    orders: async (root, args) => {
      try {
        return await Order.find({});
      } catch (error) {
        throw new Error("Something went wrong.");
      }
    },
    order: async (root, args) => {
      try {
        const order = await Order.findById(args.id);
        if (!order) {
          throw putError("not found");
        }
        return order;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    orderbyUser: async (root, args) => {
      try {
        const order = await Order.findOne({ user_id: args.user_id });
        if (!order) {
          throw putError("Order not found");
        }
        return order;
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    }
  },
  Mutation: {
    addOrder: async (root, args) => {
      try {
        const newOrder = new Order({
          user_id: args.user_id,
          total: args.total,
          products: args.products
        });

        return await newOrder.save();
      } catch (error) {
        error = checkError(error);
        throw new Error(error.custom_message);
      }
    },
    deleteOrder: async (root, args) => {
      const order = await Order.findByIdAndRemove(args.id);
      if (order) {
        return true;
      }
      return false;
    }
  }
};
