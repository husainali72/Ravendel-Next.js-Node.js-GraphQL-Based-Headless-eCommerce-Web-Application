const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PageSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    status: {
      type: String
    },
    url: {
      type: String
    },
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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Page", PageSchema);
