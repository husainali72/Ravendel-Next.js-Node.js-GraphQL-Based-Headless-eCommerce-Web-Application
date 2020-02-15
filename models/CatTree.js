const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CatTreeSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  tree: [],
  parent: {
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

module.exports = mongoose.model("CatTree", CatTreeSchema);
