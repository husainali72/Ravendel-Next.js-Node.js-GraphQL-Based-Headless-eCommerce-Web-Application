const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ShippingSchema = new Schema({
  global: {
    is_global: {
      type: Boolean,
    },
    is_per_order: {
      type: Boolean,
    },
      shippingClass: {
      type: Schema.ObjectId,
    },
      overwrite: {
      type: Boolean,
    },
  },
  shippingClass: [
    {
      name: {
        type: String,
      },
      amount: {
        type: Number,
        // min: 0,
      },
      system: {
        type: Number,
        // default: 0,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
});

var Shipping = (module.exports = mongoose.model("Shipping", ShippingSchema));

module.exports.createShipping = async () => {
  const shipping = await Shipping.findOne({});
  if (shipping) {
    return;
  }

  var newShipping = new Shipping({
    global: {
      is_global: false,
      is_per_order: false,
    },
    shippingClass: [
      {
        name: "Free Shipping",
        amount: 0,
        system: 1,
      },
    ],
  });

  newShipping.save(async (err, defaultShipping) => {
    if (err) throw err;
    //const defaultShipping = await Shipping.findOne({});
    defaultShipping.global.shippingClass =
      defaultShipping.shippingClass[0]._id;
    let result = await defaultShipping.save();
    console.log(result);
  });
};
