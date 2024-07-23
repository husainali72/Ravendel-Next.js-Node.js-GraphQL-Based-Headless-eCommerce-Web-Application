const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaxSchema = new Schema({
  is_inclusive: {
    type: Boolean,
  },
  global: {
    is_global: {
      type: Boolean,
    },
    overwrite: {
      type: Boolean,
    },
    taxClass: {
      type: Schema.ObjectId,
    },



  },
  taxClass: [
    {
      name: {
        type: String,
      },
      percentage: {
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

const Tax = (module.exports = mongoose.model("Tax", TaxSchema));

const defaultTaxes = [
  {
    is_inclusive: true,
    global: {
      is_global: true,
    },
    taxClass: [
      {
        name: "Tax Free",
        percentage: 0,
        system: 1,
      },
    ],
  }
]

module.exports.createDefaultTaxes = async () => {
  const existingTaxes = await Tax.findOne({});
  if (existingTaxes) {
    return;
  }

  const taxes = await Tax.insertMany(defaultTaxes)

  if(taxes.length) {
    for(const tax of taxes) {
      tax.global.taxClass = tax.taxClass[0]._id
  
      await tax.save()
    }
  }
};
