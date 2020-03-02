const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  brand_logo: {},
  meta: {
    title: {
      type: String
    },
    desciption: {
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

module.exports = mongoose.model("Brand", BrandSchema);
