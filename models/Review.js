const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
  title: {
    type: String
  },
  customerId: {
    type: Schema.ObjectId
  },
  productId: {
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
