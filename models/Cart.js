const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  user_id: {
    type: Schema.ObjectId,
    required: true
  },
  total: {
    type: Number,
     },
  products: [
    {
      product_id: {
        type: Schema.ObjectId,
        required: true
      },
      
      product_title: {
        type: String,
        
      },
      product_image: {
        type: String,
      },
      product_price: {
        type: Number,
      },
      product_taxPercentage: {
        type: Number,
      },
      product_tax: {
        type: Number,
      },
      qty: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
       
      },
      attributes: [
        {
          name:
            { type: String },
          value:
            { type: String }
        }
      ],
      product_quantity: {
        type: Number
      },
      variant_id: {
        type: String
      },
      shipping_class: {
        type: Schema.ObjectId,        
      },
      tax_class: {
        type: Schema.ObjectId,        
      }
    }
  ],
  status: {
    type: String,
    default: "active"
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

module.exports = mongoose.model("Cart", CartSchema);