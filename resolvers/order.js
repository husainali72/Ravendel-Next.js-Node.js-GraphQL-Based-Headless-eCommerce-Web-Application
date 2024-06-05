const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Setting = require("../models/Setting");
const Shipping = require("../models/Shipping");
const Customer = require("../models/Customer");
const Tax = require("../models/Tax");
const Coupon = require("../models/Coupon");
const mongoose = require('mongoose');
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
  _validatenested,
  subTotalDetailsEntry,
  subTotalSummaryEntry,
  sendEmail,
  generateOrderNumber,
  emptyCart,
  addOrder, updatePaymentStatus
} = require("../config/helpers");
const {
  DELETE_FUNC,
  GET_SINGLE_FUNC,
  GET_ALL_FUNC,
} = require("../config/api_functions");
const APP_KEYS = require('../config/keys')
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

      if (!args.userId) {
        return MESSAGE_RESPONSE("ID_ERROR", "Order", false);
      }
      try {
        const order = await Order.find(
          { 
            userId: new mongoose.Types.ObjectId(args.userId),
            $or: [
              { 'billing.paymentMethod': { $in: ["cashondelivery", "banktransfer"] } },
              { paymentStatus: "success" },
            ],
          }
        ).sort({ date: -1 });

        if (!order) {
          return MESSAGE_RESPONSE("NOT_EXIST", "Order", false);
        }
        return {
          message: {
            message: "Customer order Fetched",
            success: true,
          },
          data: order
        }
        // return MESSAGE_RESPONSE("RESULT_FOUND", "Order", true);
      } catch (error) {
        console.log(error.message)
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Order", false);
      }
    },
  },
  Mutation: {
    addOrder: async (root, args, { id }) => {
      try {
        if (!id) {
          return MESSAGE_RESPONSE("TOKEN_REQ", "Order", false);
        }
        let myResponse = await addOrder(args);
        return myResponse;
      } catch (error) {
        console.log(error.message)
        return MESSAGE_RESPONSE("CREATE_ERROR", "Order", false);
      }
    },
    updateOrder: async (root, args, { id }) => {
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
            "paymentMethod",
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
          order.paymentStatus = args.paymentStatus;
          order.shippingStatus = args.shippingStatus;
          order.billing = args.billing;
          order.shipping = args.shipping;
          await order.save();
          // send order create email
          mailData = {
            subject: `Order Updated`,
            mailTemplate: "template",
            order: order
          }
          sendEmail(mailData, APP_KEYS.smptUser, args.billing.email)

          return MESSAGE_RESPONSE("UpdateSuccess", "Order", true);
        }

        return MESSAGE_RESPONSE("NOT_EXIST", "Order", false);
      } catch (error) {
        console.log(error);
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Order", false);
      }
    },
    updatePaymentStatus: async (root, args, { id }) => {
      try {
        if (!id) {
          return MESSAGE_RESPONSE("TOKEN_REQ", "Order", false);
        }
        let myResponse = await updatePaymentStatus(id, args);
        return myResponse;
      } catch (error) {
        console.log(error)
        return MESSAGE_RESPONSE("UPDATE_ERROR", "Order Payment Status", false);
      }
    },
    deleteOrder: async (root, args, { id }) => {
      return await DELETE_FUNC(id, args.id, Order, "Order");
    },
  },
};
