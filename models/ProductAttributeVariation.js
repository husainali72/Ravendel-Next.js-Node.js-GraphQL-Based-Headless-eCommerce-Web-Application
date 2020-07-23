const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductAttributeVariationSchema = new Schema(
  {
    product_id: {
      type: Schema.ObjectId,
      required: true,
    },
    combination: [],
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sku: {
      type: String,
      default: 0,
    },
    image: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ProductAttributeVariation",
  ProductAttributeVariationSchema
);
