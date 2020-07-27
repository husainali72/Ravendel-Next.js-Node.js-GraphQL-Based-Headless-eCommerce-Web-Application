const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* brand: {
  type: Schema.Types.ObjectId,
  ref: "Brand",
}, */

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: [],
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
  },
  sku: {
    type: String,
  },
  short_description: {
    type: String,
  },
  description: {
    type: String,
  },
  shippingDetails: {},
  manufactureDetails: {},
  quantity: {
    type: Number,
  },
  pricing: {
    price: {
      type: Number,
      default: 0,
    },
    sellprice: {
      type: Number,
      default: 0,
    },
  },
  url: {
    type: String,
  },
  meta: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
  },
  feature_image: {},
  gallery_image: [
    {
      original: {
        type: String,
      },
      large: {
        type: String,
      },
      medium: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
    },
  ],
  status: {
    type: String,
  },
  shipping: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    depth: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    shipping_class: {
      type: Schema.ObjectId,
    },
  },
  tax_class: {
    type: Schema.ObjectId,
  },
  featured_product: {
    type: Boolean,
  },
  product_type: {
    virtual: {
      type: Boolean,
    },
    downloadable: {
      type: Boolean,
    },
  },
  custom_field: [
    {
      key: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  attribute: [
    {
      attribute_id: {
        type: Schema.ObjectId,
      },
      attribute_value_id: {
        type: Schema.ObjectId,
      },
    },
  ],
  variant: [],
  date: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
