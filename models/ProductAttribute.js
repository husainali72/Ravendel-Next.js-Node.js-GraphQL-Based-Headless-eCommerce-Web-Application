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
    _id: "5bbf0eb7add8c80013dd140c",
    name: "Material",
    slug: "material",
    order_by: "",
    values: [
      {
        name: "Cotton",
        slug: "cotton",
        _id: "65cb2b2ba9dfee40f9522717",
      },
      {
        name: "Leather",
        slug: "leather",
        _id: "65cb2b2ba9dfee40f9522718",
      },
      {
        name: "Silk",
        slug: "silk",
        _id: "65cb2b39a9dfee40f952272d",
      },
    ],
    allow_filter: false,
  },
  {
    _id: "5bbf105eadd8c80013dd140d",
    name: "Color",
    slug: "color",
    order_by: "",
    values: [
      {
        name: "Red",
        slug: "red",
        _id: "65cb2af0a9dfee40f95226da",
      },
      {
        name: "Yellow",
        slug: "yellow",
        _id: "65cb2af0a9dfee40f95226db",
      },
      {
        name: "Blue",
        slug: "blue",
        _id: "65cb2af0a9dfee40f95226dc",
      },
    ],
    allow_filter: false,
  },
  {
    _id: "5be3028e1304b8697e258e05",
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
