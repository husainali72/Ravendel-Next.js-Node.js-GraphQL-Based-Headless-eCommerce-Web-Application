const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FaqSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Faq", FaqSchema);
