const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Setting = require("../models/Setting");
const Shipping = require("../models/Shipping");
const Customer = require("../models/Customer");
const Tax = require("../models/Tax");
const Coupon = require("../models/Coupon");
const {
  isEmpty,
  MESSAGE_RESPONSE,
  _validate,
  _validatenested,
  subTotalDetailsEntry,
  subTotalSummaryEntry,
  sendEmail,
  generateOrderNumber,
  emptyCart
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
        const order = await Order.find({ userId: args.userId }).sort({ date: -1 });

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
        return MESSAGE_RESPONSE("RETRIEVE_ERROR", "Order", false);
      }
    },
  },
  Mutation: {
    addOrder: async (root, args, { id }) => {
      try {
        var errors = _validate(["userId"], args);
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
            "paymentMethod",
          ], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const setting = await Setting.findOne({});
        var Secret_Key = setting.paymnet.stripe.secret_key;
        const stripe = require('stripe')(Secret_Key);

        // var c_grandTotal = parseFloat(args.subtotal) + parseFloat(args.shippingAmount) + parseFloat(args.taxAmount) - parseFloat(args.discountAmount);

        // var c_grandTotal = parseFloat(args.grandTotal) - parseFloat(args.discountAmount);
        if (args.billing.paymentMethod === 'Cash On Delivery') {
          var status = 'pending';
          var userId = args.userId;
          const cart = await Cart.findOne({ userId: args.userId });
          emptyCart(cart);
        } else {
          let currencycode;
          if (setting.store.currency_options.currency == 'eur') {
            currencycode = 'EUR'
          } else if (setting.store.currency_options.currency == 'gbp') {
            currencycode = 'GBP';
          } else if (setting.store.currency_options.currency == 'cad') {
            currencycode = 'CAD';
          } else {
            currencycode = 'USD';
          }
          const payment = await stripe.paymentIntents.create({
            amount: args.grandTotal * 100,
            currency: currencycode,
            description: args.billing.email,
            paymentMethod: args.billing.transaction_id,
            confirm: true
          })
          if (payment.status == 'succeeded') {
            status = 'success';
          } else {
            status = 'pending';
          }
          const cart = await Cart.findOne({ userId: args.userId });
          emptyCart(cart)
        }

        const orderNumber = await generateOrderNumber(Order, Setting)

        const newOrder = new Order({
          orderNumber: orderNumber,
          userId: args.userId,
          billing: args.billing,
          shipping: args.shipping,
          paymentStatus: status,
          shippingStatus: "inprogress",
          cartTotal: args.cartTotal, // previous sub_total
          shippingAmount: args.shippingAmount,
          taxAmount: args.taxAmount,
          couponCode: args.couponCode,
          discountAmount: args.discountAmount,
          grandTotal: args.grandTotal,
        });
        newOrder.products = args.products;
        // const subTotalDetails = await subTotalDetailsEntry(args, Coupon, Shipping, Tax)
        // const subTotalSummary = await subTotalSummaryEntry(args, Coupon, Shipping, Tax)
        // newOrder.sub_total_details = subTotalDetails
        // newOrder.sub_total_summary = subTotalSummary.subTotalSummary
        // newOrder.subtotal = subTotalSummary.orderSubTotal
        // newOrder.grandTotal = subTotalSummary.orderGrandTotal
        await newOrder.save();
        // send order create email
        const customer = await Customer.findById(args.userId);
        mailData = {
          subject: `Order Placed`,
          mailTemplate: "template",
          order: newOrder
        }
        sendEmail(mailData, APP_KEYS.smptUser, customer?.email)

        return MESSAGE_RESPONSE("AddSuccess", "Order", true);
      } catch (error) {
        console.log(error)
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
    deleteOrder: async (root, args, { id }) => {
      console.log("delete", args)
      return await DELETE_FUNC(id, args.id, Order, "Order");
    },
  },
};
