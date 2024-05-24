const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductCatSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parentId: {
    type: Schema.ObjectId,
    default: null
  },
  attributes: [],
  url: {
    type: String
  },
  description: {
    type: String
  },
  // image: {},
  image: String,
  thumbnail_image: String,
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

const ProductCat = (module.exports = mongoose.model("ProductCat", ProductCatSchema));

const defaultProductCats = [
  {
    _id: "6622337b00d13df9f1fc2a4e",
    name: "Fashion",
    parentId: null,
    attributes: [],
    url: "fashion",
    description: "Fashion related products",
    meta: {
      title: "Fashion",
      description: "Fashion collections",
      keywords: "cloths sunglasses",
    },
    image: "",
    thumbnail_image: "",
  },
  {
    _id: "65cf18b2f551c4029018be17",
    name: "Beauty",
    parentId: null,
    attributes: [],
    url: "beauty",
    description: "Beauty related products",
    meta: {
      title: "Beauty",
      description: "Beauty collections",
      keywords: "cloths sunglasses",
    },
    image: "",
    thumbnail_image: "",
  },
  {
    _id: "6622176900d13df9f1fc2304",
    name: "Perfume",
    parentId: null,
    attributes: [],
    url: "perfume",
    description: "Perfume related products",
    meta: {
      title: "Perfume",
      description: "Perfume collections",
      keywords: "phones accessories",
    },
    image: "",
    thumbnail_image: "",
  },
]

module.exports.createDefaultProductCats = async () => {
  const existingProductsCats = await ProductCat.findOne({});
  if (existingProductsCats) {
    return;
  }
  
  const productCats = await ProductCat.insertMany(defaultProductCats)
};
