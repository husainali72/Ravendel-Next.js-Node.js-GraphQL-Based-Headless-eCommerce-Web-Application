const Order = require("../models/Order");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
  _validatenested,
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
} = require("../config/api_functions");

const validate = require("../validations/order");

module.exports = {
  Query: {
    orders: async (root, args) => {
      return await GET_ALL_FUNC(Order, " Orders");
    },
    order: async (root, args) => {
      return await GET_SINGLE_FUNC(args.id, Order, "Order");
    },
    orderbyUser: async (root, args) => {
      if (!user_id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Order", false);
      }
      try {
        const order = await Order.findOne({ user_id: args.user_id });
        if (!order) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Order", false);
        }
        return MESSAGE_RESPONSE("RESULT_FOUND", "Order", false);
      } catch (error) {
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Order", false);
      }
    },
  },
  Mutation: {
    addOrder: async (root, args, { id }) => {
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Order", false);
      }
      try {
        const newOrder = new Order({
          user_id: args.user_id,
          billing: args.billing,
          shipping: args.shipping,
          status: args.status,
        });
        newOrder.products = args.products;
        await newOrder.save();
        return MESSAGE_RESPONSE("AddSuccess", "Order", true);
      } catch (error) {
        console.log(error.message);
        return MESSAGE_RESPONSE("CREATE_ERROR", "Order", false);
      }
    },
    updateOrder: async (root, args, { id }) => {
      console.log('firedddd')
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Order", false);
      }
      try {
        const errors = _validatenested(
          "billing",
          ["city",
            "firstname",
            "lastname",
            "company",
            "address",
            "zip",
            "country",
            "state",
            "email",
            "phone",
            "payment_method",
        ], 
         "shipping",
          [
            "city",
            "firstname",
            "lastname",
            "company",
            "address",
            "zip",
            "country",
            "state",
          ],
          args
        ); 
        if (!isEmpty(errors)) {
          
          return {
            message: errors,
            success: false,
          };
        }
        if (!args.id) {
          return MESSAGE_RESPONSE("ID_ERROR", "Order", false);
        }
        const order = await Order.findById(args.id);
        if (order) {
          order.status = args.status;
          order.billing = args.billing;
          order.shipping = args.shipping;
          await order.save();
          return MESSAGE_RESPONSE("UpdateSuccess", "Order", true);
        }

        return MESSAGE_RESPONSE("NOT_EXIST", "Order", false);
      } catch (error) {
        console.log(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Order", false);
      }
    },
    deleteOrder: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Order, "Order");
    },
  },
};
