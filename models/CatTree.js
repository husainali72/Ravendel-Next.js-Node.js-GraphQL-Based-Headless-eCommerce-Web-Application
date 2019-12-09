const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CatTreeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ancestors: [],
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("CatTree", CatTreeSchema);
