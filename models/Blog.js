const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  slug: {
    type: String
  },
  feature_image: {},
  author: {
    type: Schema.ObjectId,
    default: null
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

module.exports = mongoose.model("Blog", BlogSchema);
