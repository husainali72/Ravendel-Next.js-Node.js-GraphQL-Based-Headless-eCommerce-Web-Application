const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  // brand_logo: {},
  brand_logo: String,
  meta: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    keywords: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});

const Brand = (module.exports = mongoose.model("Brand", BrandSchema));

const defaultBrands = [
  {
    _id: "5ad4788c6d849d5a1465c916",
    name: "Bewakoof",
    url: "bewakoof",
    brand_logo: "",
    meta: {
      title: "Bewakoof",
      description: "Clothes Brand",
      keywords: "clothing, fashion, youngsters"
    }
  },
  {
    _id: "5ad4789c6d849d5a1465c917",
    name: "Nestasia",
    url: "nestasia",
    brand_logo: "",
    meta: {
      title: "Nestasia",
      description: "Nestasia Brand",
      keywords: "mug, cup, bottle"
    }
  },
  {
    _id: "5ad4789c6d849d5a1465c918",
    name: "Redragon",
    url: "redragon",
    brand_logo: "",
    meta: {
      title: "Redragon",
      description: "Redragon Brand",
      keywords: "keyboard, rgb, switches"
    }
  },
  {
    _id: "5ad4789c6d849d5a1465c919",
    name: "Zebronics",
    url: "zebronics",
    brand_logo: "",
    meta: {
      title: "Zebronics",
      description: "Zebronics Brand",
      keywords: "keyboard, mouse, elctronics"
    }
  },
]

module.exports.createDefaultBrands = async () => {
  const existingBrands = await Brand.findOne({});
  if (existingBrands) {
    return;
  }
  
  const brands = await Brand.insertMany(defaultBrands)
};
