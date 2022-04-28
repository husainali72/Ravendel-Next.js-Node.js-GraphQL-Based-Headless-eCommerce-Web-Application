const Order = require("../models/Order");
const Cart = require("../models/Cart");
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
      console.log("payload", args)
      if (!args.user_id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Order", false);
      }
      try {
        const order = await Order.findOne({ user_id: args.user_id });
        console.log("order", order)
        if (!order) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Order", false);
        }
        return {
          message: {
            message: "RESULT_FOUND",
            success: true,
          },
          data: order
        }
        // return MESSAGE_RESPONSE("RESULT_FOUND", "Order", true);
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
        var errors = _validate(["customer_id"], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        errors = _validatenested(
          "billing",
          [
            "city",
            "firstname",
            "lastname",
            "address",
            "zip",
            "email",
            "phone",
            "payment_method",
          ],
          args
        );
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        if (args.billing.payment_method === 'Cash On Delivery') {
          var status = 'Success';
          var user_id = args.customer_id;
          const cart = await Cart.findOneAndDelete({ user_id: args.customer_id });
        } else {
          var status = 'Pending';
        }
        const newOrder = new Order({
          customer_id: args.customer_id,
          billing: args.billing,
          shipping: args.shipping,
          status: status,
          subtotal: args.subtotal,
          shipping_amount: args.shipping_amount,
          tax_amount: args.tax_amount,
          discount_amount: args.discount_amount,
          grand_total: args.grand_total,
        });
        newOrder.products = args.products;

        //console.log(newOrder);
        await newOrder.save();
        return MESSAGE_RESPONSE("AddSuccess", "Order", true);
      } catch (error) {
        return MESSAGE_RESPONSE("CREATE_ERROR", "Order", false);
      }
    },
    updateOrder: async (root, args, { id }) => {
      console.log('firedddd')
      if (!id) {
        return MESSAGE_RESPONSE("TOKEN_REQ", "Order", false);
      }
      try {
        var errors = _validatenested(
          "billing",
          [
            "city",
            "firstname",
            "lastname",
            "address",
            "zip",
            "email",
            "phone",
            "payment_method",
          ],
          args
        );
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }
        errors = _validatenested(
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
      console.log("delete", args)
      return await DELETE_FUNC(id, args.id, Order, "Order");
    },
  },
};
