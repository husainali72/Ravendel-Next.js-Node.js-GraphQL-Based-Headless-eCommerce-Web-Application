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
    company: String, // not sure about this field
    address: String,
    city: String,
    zip: String,
    country: String,
    state: String,
    email: String,
    phone: String,
    paymentMethod: String, // not sure about this field
    transaction_id: String // not sure about this field
  },
  shipping: {
    firstname: String,
    lastname: String,
    company: String, // not sure about this field
    address: String,
    city: String,
    zip: String,
    country: String,
    state: String,
    email: String,
    phone: String,
    notes: String
  }, 
  
  // transactionDetail : {
  //   sessionId: String,
  // },
  transactionDetail : {
    type: Object,
  },
  paymentStatus: {
    type: String,
    enum: ['processing', 'pending', 'failed', 'success', 'cancelled'],
    default: 'processing'
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
      variantId: {
        type: String
      },
      productTitle: {
        type: String,
        required: true
      },
      productImage: {
        type: String,
      },
      url: {
        type: String
      },
      attributes: [{
        name:
          { type: String },
        value:
          { type: String }
      }],
      shippingClass: {
        type: Schema.ObjectId,        
      },
      taxClass: {
        type: Schema.ObjectId,        
      },
      feature_image: {
        type: Number,
      }, // not sure about this field
      
      qty: {
        type: Number,
        required: true
      },
      mrp: {
        type: Number,
        required: true
      },
      discountPrice: {
        type: Number
      },
      productPrice: {
        type: Number,
        required: true
      },
      discountPercentage: {
        type: Number
      },
      taxPercentage: {
        type: Number
      },
      
      mrpAmount: {
        type: Number,
        required: true
      },
      discountAmount: {
        type: Number
      },
      amount: {
        type: Number,
        required: true
      },
      taxAmount: {
        type: Number
      },
      shippingAmount: {
        type: Number
      },
      total: {
        type: Number,
        required: true
      }
    }
  ],
  couponCard: {
    couponApplied: {
      type: Boolean,
      required: true
    },
    appliedCouponCode: {
      type: String
    },
    appliedCouponDiscount: {
      type: Number,
    },
    isCouponFreeShipping: {
      type: Boolean
    }
  },

  totalSummary: {
    currency_code: {
      type: String,
      required: true
    },
    mrpTotal: {
      type: Number,
      required: true
    },
    discountTotal: {
      type: Number
    },
    cartTotal: {
      type: Number
    },
    totalTax: {
      type: Number
    },
    totalShipping: {
      type: Number
    },
    grandTotal: {
      type: Number,
      required: true
    },
    couponDiscountTotal: {
      type: Number
    }
  }

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

  // cartTotal: {
  //   type: Number,
  //   required: true
  // },
  // shippingAmount: {
  //   type: Number,
  //   required: true
  // },
  // taxAmount: {
  //   type: Number,
  //   required: true
  // },
  // couponCode: {
  //   type: String,
  // },
  // discountAmount: {
  //   type: Number,
  //   required: true
  // },
  // grandTotal: {
  //   type: Number,
  //   required: true
  // },    


});

module.exports = mongoose.model("Order", OrderSchema);
