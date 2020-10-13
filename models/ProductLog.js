const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductLog = new Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductLog", ProductLog);
