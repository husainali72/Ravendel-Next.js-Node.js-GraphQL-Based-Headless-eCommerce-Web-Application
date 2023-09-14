const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  customer_id: {
    type: Schema.ObjectId,
    required: true
  },
  order_number: {
    type: String,
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
  cartTotal: {
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
  grandTotal: {
    type: Number,
    required: true
  },    
  payment_status: {
    type: String,
    enum: ['pending', 'failed', 'success', 'cancelled'],
    default: 'pending'
  },
  shipping_status: {
    type: String,
    enum: ['inprogress', 'shipped', 'outfordelivery', 'delivered'],
    default: 'inprogress'
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  products: [
    {
      productId: {
        type: Schema.ObjectId,
        required: true
      },
      productTitle: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      feature_image: {
        type: Number,
      },
      productTotal : {
        type: Number,
      },
      productShipping : {
        type: Number,
      },
      productTax : {
        type: Number
      },
      attributes: []
    }
  ]
  // sub_total_details: {
  //   shipping_name: String,
  //   tax_name: String,
  //   coupon_code: String,
  //   coupon_type: String,
  //   coupon_value: Number
  // },
  // sub_total_summary: {
  //   shipping_value: Number,
  //   tax_value: Number,
  //   coupon_value: Number,
  //   coupon_type: String,
  //   sub_total: Number,
  //   total: Number
  // },
});

module.exports = mongoose.model("Order", OrderSchema);
