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
  discountType: {
    type: String
  },
  discountValue: {
    type: Number,
    min : 0
  },
  freeShipping: {
    type: Boolean,
    default: false
  },
  expire: {
    type: String
  },
  minimumSpend: {
    type: Number,
    // min : 0
  },
  maximumSpend: {
    type: Number,
    // min : 0
  },
  product: Boolean,
  includeProducts: [],
  excludeProducts: [],
  category: Boolean,
  includeCategories: [],
  excludeCategories: [],
  categoryTree: Schema.Types.Mixed,
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Coupon", CouponSchema);
