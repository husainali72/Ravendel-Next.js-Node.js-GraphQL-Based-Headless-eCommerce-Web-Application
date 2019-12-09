const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  categoryId: [],
  sku: {
    type: String
  },
  description: {
    type: String
  },
  shippingDetails: {},
  manufactureDetails: {},
  quantity: {
    type: Number
  },
  pricing: {},
  slug: {
    type: String
  },
  meta: [
    {
      key: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  status: {
    type: String,
    default: "active"
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Product", ProductSchema);
