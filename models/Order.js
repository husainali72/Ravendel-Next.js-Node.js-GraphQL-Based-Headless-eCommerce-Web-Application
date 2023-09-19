const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true
  },
  orderNumber: {
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
    paymentMethod: String,
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
  shippingAmount: {
    type: Number,
    required: true
  },
  taxAmount: {
    type: Number,
    required: true
  },
  couponCode: {
    type: String,
  },
  discountAmount: {
    type: Number,
    required: true
  },
  grandTotal: {
    type: Number,
    required: true
  },    
  paymentStatus: {
    type: String,
    enum: ['pending', 'failed', 'success', 'cancelled'],
    default: 'pending'
  },
  shippingStatus: {
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
      productImage: {
        type: String,
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
      productTaxPercentage: {
        type: Number,
      },
      attributes: [{
        name:
          { type: String },
        value:
          { type: String }
      }],
      variantId: {
        type: String
      },
      shippingClass: {
        type: Schema.ObjectId,        
      },
      taxClass: {
        type: Schema.ObjectId,        
      }
    }
  ]
  // sub_total_details: {
  //   shipping_name: String,
  //   tax_name: String,
  //   couponCode: String,
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
