const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CouponSchema = new Schema({
  code: {
    type: String
  },
  description: {
    type: String
  },
  discount_type: {
    type: String
  },
  discount_value: {
    type: Number
  },
  free_shipping: {
    type: Boolean,
    default: false
  },
  expire: {
    type: String
  },
  minimum_spend: {
    type: Number
  },
  maximum_spend: {
    type: Number
  },
  products: [],
  exclude_products: [],
  categories: [],
  exclude_categories: [],
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Coupon", CouponSchema);
