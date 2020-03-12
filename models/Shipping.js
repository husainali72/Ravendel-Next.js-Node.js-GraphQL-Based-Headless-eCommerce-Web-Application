const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ShippingSchema = new Schema({
  global: {
    is_global: {
      type: Boolean
    },
    name: {
      type: String
    },
    amount: {
      type: Number
    },
    is_per_order: {
      type: Boolean
    }
  },
  shipping_class: [
    {
      name: {
        type: String
      },
      amount: {
        type: Number
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

var Shipping = (module.exports = mongoose.model("Shipping", ShippingSchema));

module.exports.createShipping = async () => {
  const shipping = await Shipping.findOne({});
  if (shipping) {
    return;
  }

  var newShipping = new Shipping({
    global: {
      is_global: true,
      name: "Flat100",
      amount: 100,
      is_per_order: false
    },
    shipping_class: [
      {
        name: "Flat50",
        amount: 50
      },
      {
        name: "Flat200",
        amount: 200
      }
    ]
  });

  newShipping.save((err, shipping) => {
    if (err) throw err;
    console.log(shipping);
  });
};
