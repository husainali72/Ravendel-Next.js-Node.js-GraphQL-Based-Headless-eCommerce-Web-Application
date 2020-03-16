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
  pricing: {
    price: {
      type: Number,
      default: 0
    },
    sellprice: {
      type: Number,
      default: 0
    }
  },
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
  gallery_image: [
    {
      original: {
        type: String
      },
      large: {
        type: String
      },
      medium: {
        type: String
      },
      thumbnail: {
        type: String
      }
    }
  ],
  status: {
    type: String
  },
  shipping: {
    height: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    depth: {
      type: Number,
      default: 0
    },
    weight: {
      type: Number,
      default: 0
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
