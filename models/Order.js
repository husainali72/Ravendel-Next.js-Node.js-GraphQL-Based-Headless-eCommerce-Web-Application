const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  customer_id: {
    type: Schema.ObjectId,
    required: true
  },
  billing: {
    firstname: String,
    lastname: String,
    company: String,
    address: String,
    city: String,
    zip: String,
    country: String,
    state: String,
    email: String,
    phone: String,
    payment_method: String,
    transaction_id: String
  },
  shipping: {
    firstname: String,
    lastname: String,
    company: String,
    address: String,
    city: String,
    zip: String,
    country: String,
    state: String,
    email: String,
    phone: String,
    notes: String
  },
  products: [
    {
      product_id: {
        type: Schema.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      cost: {
        type: Number,
        required: true
      },
      qty: {
        type: Number,
        required: true
      }
    }
  ],
  subtotal: {
        type: Number,
        required: true
  },
  shipping_amount: {
        type: Number,
        required: true
  },
  tax_amount: {
        type: Number,
        required: true
  },
  coupon_code: {
        type: String,
  },
  discount_amount: {
        type: Number,
        required: true
      },
  grand_total: {
        type: Number,
        required: true
  },
  payment_status: {
    type: String,
    enum : ['pending','failed','success','cancelled'],
    default: 'pending'
  },
  shipping_status: {
    type: String,
    enum : ['inprogress','shipped','outfordelivery','delivered'],
    default: 'inprogress'
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Order", OrderSchema);
