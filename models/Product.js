const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* brand: {
  type: Schema.Types.ObjectId,
  ref: "Brand",
}, */ 
const specificationSchema = new Schema({
  key: {
    type: String,
  },
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute"
  },
  value: {
    type: String,
  },
  attributeValueId: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute"
  },
  group: {
    type: String,
  },
}, {_id: false})

// Create Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: [],
  categoryTree: [],
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    default: null,
  },
  sku: {
    type: String,
  },
  short_description: {
    type: String,
  },
  description: {
    type: String,
  },
  shippingDetails: {},
  manufactureDetails: {},
  quantity: {
    type: Number,
  },
  pricing: {
    price: {
      type: Number,
      default: 0,
    },
    sellprice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
  },
  url: {
    type: String,
  },
  meta: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    keywords: {
      type: String,
    },
  },
  // feature_image: {},
  // gallery_image: [
  //   {
  //     original: {
  //       type: String,
  //     },
  //     large: {
  //       type: String,
  //     },
  //     medium: {
  //       type: String,
  //     },
  //     thumbnail: {
  //       type: String,
  //     },
  //   },
  // ],
  feature_image: String,
  gallery_image: [String],
  
  status: {
    type: String,
  },
  shipping: {
    height: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    depth: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    shippingClass: {
      type: Schema.ObjectId,
    },
  },
  taxClass: {
    type: Schema.ObjectId,
  },
  featured_product: {
    type: Boolean,
  },
  product_type: {
    virtual: {
      type: Boolean,
    },
    downloadable: {
      type: Boolean,
    },
  },
  custom_field: [
    {
      key: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
  specifications: [specificationSchema],
  date: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    default: 0
  },
  updated: {
    type: Date,
  },
});

const Product = (module.exports = mongoose.model("Product", ProductSchema));

const defaultProducts = [
  {
    _id: "664f1ae23cc739384ba1632c",
    name: "Essence Mascara Lash Princess",
    description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    categoryId: ["65cf18b2f551c4029018be17"],
    categoryTree: [
      {
        id: "65cf18b2f551c4029018be17",
        name: "Beauty",
        url: "beauty",
        checked: true,
        children: [],
      },
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1A",
    short_description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    url: "essence-mascara-lash-princess",
    specifications: [
      {
        group: "General",
        key: "Color",
        attributeId: "5bbf105eadd8c80013dd140d",
        value: "Red",
        attributeValueId: "65cb2af0a9dfee40f95226da",
      },
      {
        group: "General",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e05",
        value: "S",
        attributeValueId: "663e1986fb7a278d2900f0e0",
      },
      {
        group: "General",
        key: "Smudge Proof",
        value: "Yes",
      },
      {
        group: "General",
        key: "Type",
        value: "Light Weight",
      },
    ],
    rating: 4.5,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    meta: {
      title: "Essence Mascara Lash Princess",
      description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      keywords: "beauty, mascara",
    },
    shipping: {
      height: 14,
      width: 23,
      depth: 28,
      weight: 123,
      shippingClass: "665085fc4e0705e97d197960",
    },
    taxClass: "66508617c33b8d6b46b8eee6",
  },
  {
    _id: "664f1a6c5ca9e1a47c5062b0",
    name: "Eyeshadow Palette with Mirror",
    description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    categoryId: ["65cf18b2f551c4029018be17"],
    categoryTree: [
      {
        id: "65cf18b2f551c4029018be17",
        name: "Beauty",
        url: "beauty",
        checked: true,
        children: [],
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "MVCFH27F",
    short_description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
    quantity: 10,
    pricing: {
      price: 20,
      sellprice: 18,
      discountPercentage: 20,
    },
    url: "eyeshadow-palette-with-mirror",
    specifications: [
      {
        group: "General",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e05",
        value: "S",
        attributeValueId: "663e1986fb7a278d2900f0e0",
      },
      {
        group: "General",
        key: "Smudge Proof",
        value: "Yes",
      },
      {
        group: "General",
        key: "Type",
        value: "Light Weight",
      },
    ],
    rating: 4,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    meta: {
      title: "Eyeshadow Palette with Mirror",
      description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
      keywords: "beauty, eye, shadow",
    },
    shipping: {
      height: 8,
      width: 12,
      depth: 29,
      weight: 97,
      shippingClass: "665085fc4e0705e97d197960",
    },
    taxClass: "66508617c33b8d6b46b8eee6",
  },
  {
    _id: "664f1809fec869d3b6c10323",
    name: "Powder Canister",
    description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    categoryId: ["6622337b00d13df9f1fc2a4e"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a4e",
        name: "Fashion",
        url: "fashion",
        checked: true,
        children: [],
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "9EN8WLT2",
    short_description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
    quantity: 10,
    pricing: {
      price: 15,
      sellprice: 12,
      discountPercentage: 20,
    },
    url: "powder-canister",
    specifications: [
      {
        group: "General",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e05",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },
      {
        group: "General",
        key: "Water Proof",
        value: "Yes",
      },
      {
        group: "General",
        key: "Type",
        value: "Light Weight",
      },
    ],
    rating: 3.8,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    meta: {
      title: "Powder Canister",
      description: "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
      keywords: "beauty, powder, canister",
    },
    shipping: {
      height: 10,
      width: 24,
      depth: 11,
      weight: 103,
      shippingClass: "665085fc4e0705e97d197960",
    },
    taxClass: "66508617c33b8d6b46b8eee6",
  },
  {
    _id: "664f17cdfec869d3b6c10313",
    name: "Calvin Klein CK One",
    description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    categoryId: ["6622337b00d13df9f1fc2a4e"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a4e",
        name: "Fashion",
        url: "fashion",
        checked: true,
        children: [],
      },
    ],
    brand: "5ad4789c6d849d5a1465c918",
    sku: "DZM2JQZE",
    short_description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
    quantity: 17,
    pricing: {
      price: 50,
      sellprice: 45,
      discountPercentage: 10,
    },
    url: "calvin-klein-ck-one",
    specifications: [
      {
        group: "General",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e05",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },
      {
        group: "General",
        key: "Warranty Information",
        value: "5 year warranty",
      },
      {
        group: "General",
        key: "Return Policy",
        value: "No Return Policy",
      },
    ],
    rating: 4.8,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    meta: {
      title: "Calvin Klein CK One",
      description: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
      keywords: "fragrance, perfumes",
    },
    shipping: {
      height: 14,
      width: 11,
      depth: 6,
      weight: 5,
      shippingClass: "665085fc4e0705e97d197960",
    },
    taxClass: "66508617c33b8d6b46b8eee6",
  },
  {
    _id: "664f1626f8605dd1d9c9255f",
    name: "Dior J'adore",
    description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    categoryId: ["6622176900d13df9f1fc2304"],
    categoryTree: [
      {
        id: "6622176900d13df9f1fc2304",
        name: "Perfume",
        url: "perfume",
        checked: true,
        children: [],
      },
    ],
    brand: "5ad4789c6d849d5a1465c919",
    sku: "E70NB03B",
    short_description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    quantity: 91,
    pricing: {
      price: 80,
      sellprice: 72,
      discountPercentage: 10,
    },
    url: "dior-j-adore",
    specifications: [
      {
        group: "General",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e05",
        value: "L",
        attributeValueId: "663e1986fb7a278d2900f0e2",
      },
      {
        group: "General",
        key: "Warranty Information",
        value: "Lifetime warranty",
      },
      {
        group: "General",
        key: "Return Policy",
        value: "7 days Return Policy",
      },
    ],
    rating: 3.3,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    meta: {
      title: "Dior J'adore",
      description: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
      keywords: "fragrance, perfumes",
    },
    shipping: {
      height: 7,
      width: 21,
      depth: 26,
      weight: 10,
      shippingClass: "665085fc4e0705e97d197960",
    },
    taxClass: "66508617c33b8d6b46b8eee6",
  },
  {
    _id: "664c38d7bf38781a532a6ccf",
    name: "Coco Noir Eau De",
    description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    categoryId: ["6622176900d13df9f1fc2304"],
    categoryTree: [
      {
        id: "6622176900d13df9f1fc2304",
        name: "Perfume",
        url: "perfume",
        checked: true,
        children: [],
      },
    ],
    brand: "5ad4789c6d849d5a1465c919",
    sku: "K71HBCGS",
    short_description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
    quantity: 41,
    pricing: {
      price: 100,
      sellprice: 88,
      discountPercentage: 12,
    },
    url: "coco-noir-eau-de",
    specifications: [
      {
        group: "General",
        key: "Material",
        attributeId: "5bbf0eb7add8c80013dd140c",
        value: "Silk",
        attributeValueId: "65cb2b39a9dfee40f952272d",
      },
      {
        group: "General",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e05",
        value: "S",
        attributeValueId: "663e1986fb7a278d2900f0e0",
      },
      {
        group: "General",
        key: "Warranty Information",
        value: "1 week warranty",
      },
      {
        group: "General",
        key: "Return Policy",
        value: "60 days Return Policy",
      },
    ],
    rating: 2.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
    },
    meta: {
      title: "Coco Noir Eau De",
      description: "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
      keywords: "fragrance, perfumes",
    },
    shipping: {
      height: 28,
      width: 21,
      depth: 11,
      weight: 4,
      shippingClass: "665085fc4e0705e97d197960",
    },
    taxClass: "66508617c33b8d6b46b8eee6",
  },
]

module.exports.createDefaultProducts = async () => {
  const existingProducts = await Product.findOne({});
  if (existingProducts) {
    return;
  }
  
  const products = await Product.insertMany(defaultProducts)
};