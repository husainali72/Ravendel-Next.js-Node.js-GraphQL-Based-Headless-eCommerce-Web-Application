const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductCatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parentId: {
    type: Schema.ObjectId,
    default: null
  },
  url: {
    type: String
  },
  description: {
    type: String
  },
  image: {},
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
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("ProductCat", ProductCatSchema);
