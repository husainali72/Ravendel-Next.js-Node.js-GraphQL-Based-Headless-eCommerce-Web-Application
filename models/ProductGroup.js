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
  attributeID: {
    type: Schema.Types.ObjectId,
    ref: "productattributes",
    required: true
  },
  attributeValue: {
    type: Schema.Types.ObjectId,
    ref: "productattributes",
    required: true
  },
}, {_id: false})

const variationSchema = new Schema({
  combinations: [combinationSchema],
  productID: {
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
  productIDs: [
    {
      type: Schema.Types.ObjectId,
      ref: "products"
    }
  ]
}, {timestamps: true});

module.exports = mongoose.model("ProductGroup", ProductGroupSchema);
