const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CustomerSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  company: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  address_book: [
    {
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      company: {
        type: String
      },
      phone: {
        type: String
      },
      address_line1: {
        type: String
      },
      address_line2: {
        type: String
      },
      city: {
        type: String
      },
      country: {
        type: String
      },
      state: {
        type: String
      },
      pincode: {
        type: String
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

module.exports = mongoose.model("Customer", CustomerSchema);
