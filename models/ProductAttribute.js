const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductAttributeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: "",
    },
    order_by: {
      type: String,
      default: "",
    },
    values: [
      {
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductAttribute", ProductAttributeSchema);
