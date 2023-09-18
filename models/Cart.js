const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CartSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: true
  },
  total: {
    type: Number,
     },
  products: [
    {
      productId: {
        type: Schema.ObjectId,
        required: true
      },
      productTitle: {
        type: String,
        
      },
      productImage: {
        type: String,
      },
      productPrice: {
        type: Number,
      },
      productTaxPercentage: {
        type: Number,
      },
      productTax: {
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
      productQuantity: {
        type: Number
      },
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