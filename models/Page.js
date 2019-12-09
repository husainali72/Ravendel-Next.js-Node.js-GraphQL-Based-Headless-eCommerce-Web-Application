const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  meta: [
    {
      key: {
        type: String,
        required: true
      },
      value: {
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Page", PageSchema);
