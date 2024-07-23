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

const Shipping = (module.exports = mongoose.model("Shipping", ShippingSchema));

const defaultShippings = [
  {
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
  }
]

module.exports.createDefaultShippings = async () => {
  const existingShippings = await Shipping.findOne({});
  if (existingShippings) {
    return;
  }

  const shippings = await Shipping.insertMany(defaultShippings)

  if(shippings.length) {
    console.log("shippings")
    for(const shipping of shippings) {
      console.log(shipping.shippingClass[0].name)
      shipping.global.shippingClass = shipping.shippingClass[0]._id;
  
      await shipping.save()
    }
  }
};
