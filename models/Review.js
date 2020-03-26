const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  title: {
    type: String
  },
  customer_id: {
    type: Schema.ObjectId
  },
  product_id: {
    type: Schema.ObjectId
  },
  email: {
    type: String
  },
  review: {
    type: String
  },
  rating: {
    type: Number
  },
  status: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
