const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BlogTagSchema = new Schema({
  name: {
    type: String
  },
  url: {
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

module.exports = mongoose.model("BlogTag", BlogTagSchema);
