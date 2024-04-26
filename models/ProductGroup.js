const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "productattributes"
  },
  values: [
    {
      type: Schema.Types.ObjectId,
      ref: "productattributes"
    }
  ],
})

const combinationSchema = new Schema({
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "productattributes",
    required: true
  },
  attributeValueId: {
    type: Schema.Types.ObjectId,
    ref: "productattributes",
    required: true
  },
}, {_id: false})

const variationSchema = new Schema({
  combinations: [combinationSchema],
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
    required: true
  }
})

// Create Schema
const ProductGroupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  attributes: [attributeSchema],
  variations: [variationSchema],
  productIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "products"
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model("ProductGroup", ProductGroupSchema);
