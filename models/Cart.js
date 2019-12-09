const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  products: [
    {
      product_id: {
        type: Schema.ObjectId,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        required: true
      }
    }
  ],
  status: {
    type: String,
    default: "active"
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Cart", CartSchema);
