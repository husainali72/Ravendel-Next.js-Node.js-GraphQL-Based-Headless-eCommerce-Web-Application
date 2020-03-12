const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaxSchema = new Schema({
  is_inclusive: {
    type: Boolean
  },
  global: {
    is_global: {
      type: Boolean
    },
    name: {
      type: String
    },
    percentage: {
      type: Number
    }
  },
  tax_class: [
    {
      name: {
        type: String
      },
      percentage: {
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

var Tax = (module.exports = mongoose.model("Tax", TaxSchema));

module.exports.createTax = async () => {
  const tax = await Tax.findOne({});
  if (tax) {
    return;
  }

  var newTax = new Tax({
    is_inclusive: true,
    global: {
      is_global: true,
      name: "GST",
      percentage: 10
    },
    tax_class: []
  });

  newTax.save((err, tax) => {
    if (err) throw err;
    console.log(tax);
  });
};
