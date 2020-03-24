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
  blog_tag: [],
  url: {
    type: String
  },
  feature_image: {},
  author: {
    type: Schema.ObjectId,
    default: null
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
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Blog", BlogSchema);
