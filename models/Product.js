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
    _id: "664f1ae23cc739384ba16321",
    name: "Men's Red Moon Rider Graphic Printed T-shirt",
    url: "men-s-red-moon-rider-graphic-printed-t-shirt-small",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Red Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, red",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Red",
        attributeValueId: "65cb2af0a9dfee40f95226d1",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "S",
        attributeValueId: "663e1986fb7a278d2900f0e0",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1A",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16322",
    name: "Men's Blue Moon Rider Graphic Printed T-shirt",
    url: "men-s-blue-moon-rider-graphic-printed-t-shirt-small",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Blue Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, blue",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Blue",
        attributeValueId: "65cb2af0a9dfee40f95226d3",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "S",
        attributeValueId: "663e1986fb7a278d2900f0e0",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1B",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16323",
    name: "Men's Green Moon Rider Graphic Printed T-shirt",
    url: "men-s-green-moon-rider-graphic-printed-t-shirt-small",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Green Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, green",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Green",
        attributeValueId: "65cb2af0a9dfee40f95226d2",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "S",
        attributeValueId: "663e1986fb7a278d2900f0e0",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1C",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16324",
    name: "Men's Red Moon Rider Graphic Printed T-shirt",
    url: "men-s-red-moon-rider-graphic-printed-t-shirt-med",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Red Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, red",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Red",
        attributeValueId: "65cb2af0a9dfee40f95226d1",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1D",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16325",
    name: "Men's Blue Moon Rider Graphic Printed T-shirt",
    url: "men-s-blue-moon-rider-graphic-printed-t-shirt-med",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Blue Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, blue",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Blue",
        attributeValueId: "65cb2af0a9dfee40f95226d3",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1E",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16326",
    name: "Men's Green Moon Rider Graphic Printed T-shirt",
    url: "men-s-green-moon-rider-graphic-printed-t-shirt-med",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Green Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, green",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Green",
        attributeValueId: "65cb2af0a9dfee40f95226d2",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1F",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16327",
    name: "Men's Red Moon Rider Graphic Printed T-shirt",
    url: "men-s-red-moon-rider-graphic-printed-t-shirt-large",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Red Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, red",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Red",
        attributeValueId: "65cb2af0a9dfee40f95226d1",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "L",
        attributeValueId: "663e1986fb7a278d2900f0e2",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1G",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16328",
    name: "Men's Blue Moon Rider Graphic Printed T-shirt",
    url: "men-s-blue-moon-rider-graphic-printed-t-shirt-large",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Blue Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, blue",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Blue",
        attributeValueId: "65cb2af0a9dfee40f95226d3",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "L",
        attributeValueId: "663e1986fb7a278d2900f0e2",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1H",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16329",
    name: "Men's Green Moon Rider Graphic Printed T-shirt",
    url: "men-s-green-moon-rider-graphic-printed-t-shirt-large",
    description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    short_description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
    meta: {
      title: "Men's Green Moon Rider Graphic Printed T-shirt",
      description: "Are you ready to take your style for a ride? Our Moon Rider Men's Half Sleeve T-shirt is here to elevate your wardrobe. With a unique and quirky design of a rider on a motorcycle, this T-shirt is perfect for the adventurous and bold spirit.",
      keywords: "tshirt, printed, green",
    },
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
    specifications: [
      {
        group: "Key Highlights",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Green",
        attributeValueId: "65cb2af0a9dfee40f95226d2",
      },
      {
        group: "Key Highlights",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "L",
        attributeValueId: "663e1986fb7a278d2900f0e2",
      },     
      {
        group: "Key Highlights",
        key: "Design",
        value: "Graphic Print",
      },
      {
        group: "Key Highlights",
        key: "Fit",
        value: "Regular Fit",
      },
      {
        group: "Key Highlights",
        key: "Occasion",
        value: "Casual",
      }
    ],
    brand: "5ad4788c6d849d5a1465c916",
    sku: "RCH45Q1I",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16330",
    name: "Stainless Steel Mug With Lid Set Of 2 Pink 400ml",
    url: "stainless-steel-mug-with-lid-set-of-2-pink-400ml",
    description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
    short_description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
    meta: {
      title: "Stainless Steel Mug With Lid Set Of 2 Pink 400ml",
      description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
      keywords: "cup, mug, set",
    },
    categoryId: ["6622337b00d13df9f1fc2a40"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a40",
        name: "Mug",
        url: "mug",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Pink",
        attributeValueId: "65cb2af0a9dfee40f95226d4",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "400ml",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q1Z",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16331",
    name: "Stainless Steel Mug With Lid Set Of 2 Grey 400ml",
    url: "stainless-steel-mug-with-lid-set-of-2-grey-400ml",
    description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
    short_description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
    meta: {
      title: "Stainless Steel Mug With Lid Set Of 2 Grey 400ml",
      description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
      keywords: "cup, mug, set",
    },
    categoryId: ["6622337b00d13df9f1fc2a40"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a40",
        name: "Mug",
        url: "mug",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Grey",
        attributeValueId: "65cb2af0a9dfee40f95226d5",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "400ml",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q1X",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16332",
    name: "Stainless Steel Mug With Lid Set Of 2 White 400ml",
    url: "stainless-steel-mug-with-lid-set-of-2-White-400ml",
    description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
    short_description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
    meta: {
      title: "Stainless Steel Mug With Lid Set Of 2 White 400ml",
      description: "Carry your beverages in style wherever you go in our portable desk mugs. Each mug features a cleverly designed lid with a user-friendly flip vent for effortless sipping. The ergonomic handle adds comfort to your grip, while the interior's durable 304 stainless steel guarantees long-lasting freshness for your drinks. Made with BPA-free PP exteriors, these coffee mugs remain free from condensation, making them ideal for on-the-go use or keeping your beverages fresh.",
      keywords: "cup, mug, set",
    },
    categoryId: ["6622337b00d13df9f1fc2a40"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a40",
        name: "Mug",
        url: "mug",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "White",
        attributeValueId: "65cb2af0a9dfee40f95226d6",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "400ml",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q1Y",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16340",
    name: "Insulated Thermos Stainless Steel Water Bottle White 1L",
    url: "insulated-thermos-stainless-steel-water-bottle-white-1l-med",
    description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    short_description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    meta: {
      title: "Insulated Thermos Stainless Steel Water Bottle White 1L",
      description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
      keywords: "bottle, thermos, steel",
    },
    categoryId: ["6622337b00d13df9f1fc2a41"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a41",
        name: "Bottle",
        url: "bottle",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "White",
        attributeValueId: "65cb2af0a9dfee40f95226d6",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "1L",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q3H",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16341",
    name: "Insulated Thermos Stainless Steel Water Bottle Black 1L",
    url: "insulated-thermos-stainless-steel-water-bottle-black-1l-med",
    description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    short_description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    meta: {
      title: "Insulated Thermos Stainless Steel Water Bottle Black 1L",
      description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
      keywords: "bottle, thermos, steel",
    },
    categoryId: ["6622337b00d13df9f1fc2a41"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a41",
        name: "Bottle",
        url: "bottle",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Black",
        attributeValueId: "65cb2af0a9dfee40f95226d0",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "M",
        attributeValueId: "663e1986fb7a278d2900f0e1",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "1L",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q4H",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16342",
    name: "Insulated Thermos Stainless Steel Water Bottle White 1L",
    url: "insulated-thermos-stainless-steel-water-bottle-white-1l-large",
    description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    short_description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    meta: {
      title: "Insulated Thermos Stainless Steel Water Bottle White 1L",
      description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
      keywords: "bottle, thermos, steel",
    },
    categoryId: ["6622337b00d13df9f1fc2a41"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a41",
        name: "Bottle",
        url: "bottle",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "White",
        attributeValueId: "65cb2af0a9dfee40f95226d6",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "L",
        attributeValueId: "663e1986fb7a278d2900f0e2",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "1L",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q5H",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16343",
    name: "Insulated Thermos Stainless Steel Water Bottle Black 1L",
    url: "insulated-thermos-stainless-steel-water-bottle-black-1l-large",
    description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    short_description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
    meta: {
      title: "Insulated Thermos Stainless Steel Water Bottle Black 1L",
      description: "The insulated stainless steel water bottle is the perfect blend of style, functionality, and sustainability. Crafted with precision and designed for the modern individual, this premium water bottle is more than just a hydration companion; it's an essential part of your daily routine.",
      keywords: "bottle, thermos, steel",
    },
    categoryId: ["6622337b00d13df9f1fc2a41"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a41",
        name: "Bottle",
        url: "bottle",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Black",
        attributeValueId: "65cb2af0a9dfee40f95226d0",
      },
      {
        group: "Features",
        key: "Size",
        attributeId: "5be3028e1304b8697e258e03",
        value: "L",
        attributeValueId: "663e1986fb7a278d2900f0e2",
      },     
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Stainless Steel",
        attributeValueId: "65cb2b39a9dfee40f9522722",
      },     
      {
        group: "Features",
        key: "Capacity",
        value: "1L",
      },
    ],
    brand: "5ad4789c6d849d5a1465c917",
    sku: "RCH45Q6H",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16350",
    name: "BRAHMA K586 RGB MECHANICAL KEYBOARD (RED SWITCH)",
    url: "brahma-k586-rgb-mechanical-keyboard-red-switch",
    description: "Full-featured red switch mechanical keyboard with all the extras. Blend of unique, extraordinary and practical features from Redragon. Switch puller and 8 spare Redragon 3-pin switches included. Two each of blue, red, brown, and black to try out or replace.",
    short_description: "Full-featured red switch mechanical keyboard with all the extras. Blend of unique, extraordinary and practical features from Redragon. Switch puller and 8 spare Redragon 3-pin switches included. Two each of blue, red, brown, and black to try out or replace.",
    meta: {
      title: "Insulated Thermos Stainless Steel Water Bottle Black 1L",
      description: "Full-featured red switch mechanical keyboard with all the extras. Blend of unique, extraordinary and practical features from Redragon. Switch puller and 8 spare Redragon 3-pin switches included. Two each of blue, red, brown, and black to try out or replace.",
      keywords: "bottle, thermos, steel",
    },
    categoryId: ["6622337b00d13df9f1fc2a42"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a42",
        name: "Keyboard",
        url: "keyboard",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Black",
        attributeValueId: "65cb2af0a9dfee40f95226d0",
      },    
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Hard Plastic",
        attributeValueId: "65cb2b2ba9dfee40f9522711",
      },     
      {
        group: "Features",
        key: "Key Switches",
        value: "OUTEMU Red Switch",
      },
      {
        group: "Features",
        key: "USB Connector",
        value: "USB 2.0",
      },
    ],
    brand: "5ad4789c6d849d5a1465c918",
    sku: "RCH45QT0",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
    _id: "664f1ae23cc739384ba16351",
    name: "Zeb-Max Ninja 200",
    url: "zeb-max-ninja-200",
    description: "Get the best typing experience with Max Ninja 200 keyboard. The keyboard comes with linear red mechanical switches for a perfect blend of feel and silent operation. These switches require less force from fingers to register a keystroke. The compact 75% keyboard comes with RGB LED lights and various LED modes.",
    short_description: "Get the best typing experience with Max Ninja 200 keyboard. The keyboard comes with linear red mechanical switches for a perfect blend of feel and silent operation. These switches require less force from fingers to register a keystroke. The compact 75% keyboard comes with RGB LED lights and various LED modes.",
    meta: {
      title: "Zeb-Max Ninja 200",
      description: "Get the best typing experience with Max Ninja 200 keyboard. The keyboard comes with linear red mechanical switches for a perfect blend of feel and silent operation. These switches require less force from fingers to register a keystroke. The compact 75% keyboard comes with RGB LED lights and various LED modes.",
      keywords: "keyboard",
    },
    categoryId: ["6622337b00d13df9f1fc2a42"],
    categoryTree: [
      {
        id: "6622337b00d13df9f1fc2a42",
        name: "Keyboard",
        url: "keyboard",
        checked: true,
        children: [],
      },
    ],
    specifications: [
      {
        group: "Features",
        key: "Color",
        attributeId: "5be3028e1304b8697e258e02",
        value: "Black",
        attributeValueId: "65cb2af0a9dfee40f95226d0",
      },    
      {
        group: "Features",
        key: "Material",
        attributeId: "5be3028e1304b8697e258e01",
        value: "Hard Plastic",
        attributeValueId: "65cb2b2ba9dfee40f9522711",
      },     
      {
        group: "Features",
        key: "Key Switches",
        value: "OUTEMU Red Switch",
      },
      {
        group: "Features",
        key: "USB Connector",
        value: "USB 2.0",
      },
    ],
    brand: "5ad4789c6d849d5a1465c919",
    sku: "RCH46QQ9",
    quantity: 10,
    pricing: {
      price: 10,
      sellprice: 9,
      discountPercentage: 10,
    },
    rating: 4.7,
    feature_image: "",
    gallery_image: [],
    status: "Publish",
    featured_product: false,
    product_type: {
      virtual: false,
      downloadable: false,
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
]

module.exports.createDefaultProducts = async () => {
  const existingProducts = await Product.findOne({});
  if (existingProducts) {
    return;
  }
  
  const products = await Product.insertMany(defaultProducts)
};