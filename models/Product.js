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
  url: {
    type: String
  },
  meta: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    keywords: {
      type: String
    }
  },
  feature_image: {},
  gallery_image: [],
  status: {
    type: String
  },
  shipping: {
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    depth: {
      type: Number
    },
    weight: {
      type: Number
    },
    shipping_class: {
      type: Schema.ObjectId
    }
  },
  tax: {
    taxable: {
      type: Boolean
    },
    tax_class: {
      type: Schema.ObjectId
    }
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
