const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute"
  },
  values: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductAttribute"
    }
  ],
})

const combinationSchema = new Schema({
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute",
    required: true
  },
  attributeValueId: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute",
    required: true
  },
}, {_id: false})

const variationSchema = new Schema({
  combinations: [combinationSchema],
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  productUrl: {
    type: String
  }
})

// Create Schema
const ProductGroupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: String,
  attributes: [attributeSchema],
  variations: [variationSchema],
  productIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model("ProductGroup", ProductGroupSchema);
