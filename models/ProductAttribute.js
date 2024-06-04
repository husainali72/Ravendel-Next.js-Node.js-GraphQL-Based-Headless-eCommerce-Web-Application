const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductAttributeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default: "",
    },
    order_by: {
      type: String,
      default: "",
    },
    allow_filter: {
      type: Boolean,
      default: false,
    },
    values: [
      {
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ProductAttribute = (module.exports = mongoose.model(
  "ProductAttribute",
  ProductAttributeSchema
));

const defaultProductAttributes = [
  {
    _id: "5be3028e1304b8697e258e01",
    name: "Material",
    slug: "material",
    order_by: "",
    values: [
      {
        name: "Cotton",
        slug: "cotton",
        _id: "65cb2b2ba9dfee40f9522710",
      },
      {
        name: "Hard Plastic",
        slug: "hard-plastic",
        _id: "65cb2b2ba9dfee40f9522711",
      },
      {
        name: "Stainless Steel",
        slug: "stainless-steel",
        _id: "65cb2b39a9dfee40f9522722",
      },
    ],
    allow_filter: false,
  },
  {
    _id: "5be3028e1304b8697e258e02",
    name: "Color",
    slug: "color",
    order_by: "",
    values: [
      {
        name: "Black",
        slug: "black",
        _id: "65cb2af0a9dfee40f95226d0",
      },
      {
        name: "Red",
        slug: "red",
        _id: "65cb2af0a9dfee40f95226d1",
      },
      {
        name: "Green",
        slug: "green",
        _id: "65cb2af0a9dfee40f95226d2",
      },
      {
        name: "Blue",
        slug: "blue",
        _id: "65cb2af0a9dfee40f95226d3",
      },
      {
        name: "Pink",
        slug: "pink",
        _id: "65cb2af0a9dfee40f95226d4",
      },
      {
        name: "Grey",
        slug: "grey",
        _id: "65cb2af0a9dfee40f95226d5",
      },
      {
        name: "White",
        slug: "white",
        _id: "65cb2af0a9dfee40f95226d6",
      },
    ],
    allow_filter: false,
  },
  {
    _id: "5be3028e1304b8697e258e03",
    name: "Size",
    slug: "size",
    order_by: "",
    values: [
      {
        name: "S",
        slug: "s",
        _id: "663e1986fb7a278d2900f0e0",
      },
      {
        name: "M",
        slug: "m",
        _id: "663e1986fb7a278d2900f0e1",
      },
      {
        name: "L",
        slug: "l",
        _id: "663e1986fb7a278d2900f0e2",
      },
    ],
    allow_filter: false,
  },
];

module.exports.createDefaultProductAttributes = async () => {
  const existingProductAttributes = await ProductAttribute.findOne({});
  if (existingProductAttributes) {
    return;
  }

  const productAttributes = await ProductAttribute.insertMany(
    defaultProductAttributes
  );
};
