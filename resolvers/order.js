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
      //console.log("payload", args)
      if (!args.user_id) {
        return MESSAGE_RESPONSE("ID_ERROR", "Order", false);
      }
      try {
        const order = await Order.find({ customer_id: args.user_id }).sort({date: -1});
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
      // if (!id) {
      //   return MESSAGE_RESPONSE("TOKEN_REQ", "Order", false);
      // }
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
          ], args);
        if (!isEmpty(errors)) {
          return {
            message: errors,
            success: false,
          };
        }

        const setting = await Setting.findOne({});
        //console.log('publishable_key',setting.paymnet.stripe.publishable_key);
        //console.log('secret_key',setting.paymnet.stripe.secret_key);
        var Secret_Key = setting.paymnet.stripe.secret_key;
        const stripe = require('stripe')(Secret_Key);

        var c_grand_total = parseFloat(args.subtotal) +  parseFloat(args.shipping_amount) + parseFloat(args.tax_amount) - parseFloat(args.discount_amount);
        // console.log('c_grand_total',c_grand_total);

        if (args.billing.payment_method === 'Cash On Delivery') {
          var status = 'pending';
          var user_id = args.customer_id;
          const cart = await Cart.findOne({ user_id: args.customer_id });
          emptyCart(cart)
        } else {
          let currencycode ;
          if( setting.store.currency_options.currency == 'eur'){
            currencycode = 'EUR'
          }else if( setting.store.currency_options.currency == 'gbp'){
            currencycode = 'GBP';
          }else if( setting.store.currency_options.currency == 'cad'){
            currencycode = 'CAD';
          }else{
            currencycode = 'USD';
          }
            const payment = await stripe.paymentIntents.create({
            amount : c_grand_total * 100 ,
            currency: currencycode,
            description: args.billing.email,
            payment_method: args.billing.transaction_id,
            confirm: true
          })
            if( payment.status == 'succeeded'){
            status = 'success';
          }else{
            status = 'pending';
          }
          const cart = await Cart.findOne({ user_id: args.customer_id });
          emptyCart(cart)
        }

        const orderNumber = await generateOrderNumber(Order, Setting)

        const newOrder = new Order({
          order_number: orderNumber,
          customer_id: args.customer_id,
          billing: args.billing,
          shipping: args.shipping,
          payment_status: status,
          shipping_status: "inprogress",
          subtotal: args.subtotal,
          shipping_amount: args.shipping_amount,
          tax_amount: args.tax_amount,
          coupon_code: args.coupon_code,
          discount_amount: args.discount_amount,
          grand_total: c_grand_total,
        });
        newOrder.products = args.products;
        const subTotalDetails = await subTotalDetailsEntry(args, Coupon, Shipping, Tax)
        const subTotalSummary = await subTotalSummaryEntry(args, Coupon)
        newOrder.sub_total_details = subTotalDetails
        newOrder.sub_total_summary = subTotalSummary.subTotalSummary
        newOrder.subtotal = subTotalSummary.orderSubTotal
        newOrder.grand_total = subTotalSummary.orderGrandTotal
        // console.log(newOrder.sub_total_details)
        //console.log(newOrder);
        await newOrder.save();
        // send order create email
        const customer = await Customer.findById(args.customer_id);
        mailData = {
          subject: `Order Placed`, 
          mailTemplate: "template",
          order: newOrder
        }
        sendEmail(mailData, APP_KEYS.smptUser, customer.email)

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
          order.payment_status = args.payment_status;
          order.shipping_status = args.shipping_status;
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
