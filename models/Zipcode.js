const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const zipcodeSchema = new Schema(
  {
    zipcode: {
        type: String
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Zipcode", zipcodeSchema);
