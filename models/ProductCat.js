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
    _id: "6622337b00d13df9f1fc2a40",
    name: "Mug",
    parentId: null,
    attributes: [],
    url: "mug",
    description: "Mug related products",
    meta: {
      title: "Mug",
      description: "Mug collections",
      keywords: "mug, cup",
    },
    image: "",
    thumbnail_image: "",
  },
  {
    _id: "6622337b00d13df9f1fc2a41",
    name: "Bottle",
    parentId: null,
    attributes: [],
    url: "bottle",
    description: "Bottle related products",
    meta: {
      title: "Bottle",
      description: "Bottle collections",
      keywords: "bottle, cup",
    },
    image: "",
    thumbnail_image: "",
  },
  {
    _id: "6622337b00d13df9f1fc2a42",
    name: "Keyboard",
    parentId: null,
    attributes: [],
    url: "keyboard",
    description: "Keyboard related products",
    meta: {
      title: "Keyboard",
      description: "Keyboard collections",
      keywords: "keyboard, mechanical, rgb",
    },
    image: "",
    thumbnail_image: "",
  }
]

module.exports.createDefaultProductCats = async () => {
  const existingProductsCats = await ProductCat.findOne({});
  if (existingProductsCats) {
    return;
  }
  
  const productCats = await ProductCat.insertMany(defaultProductCats)
};
