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
    name: "Essence",
    url: "essence",
    brand_logo: "",
    meta: {
      title: "Essence",
      description: "Fragnance Brand",
      keywords: "fragrance beauty odour"
    }
  },
  {
    _id: "5ad4789c6d849d5a1465c917",
    name: "Glamour Beauty",
    url: "glamour-beauty",
    brand_logo: "",
    meta: {
      title: "Glamour Beauty",
      description: "Glamour Beuty Brand",
      keywords: "glamour beauty odour"
    }
  },
  {
    _id: "5ad4789c6d849d5a1465c918",
    name: "Calvin Klein",
    url: "calvin-klein",
    brand_logo: "",
    meta: {
      title: "Calvin Klein",
      description: "Calvin Klein Brand",
      keywords: "fashion clothing dress"
    }
  },
  {
    _id: "5ad4789c6d849d5a1465c919",
    name: "Dior",
    url: "dior",
    brand_logo: "",
    meta: {
      title: "Dior",
      description: "Dior Brand",
      keywords: "fragrance beauty lipstick"
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
