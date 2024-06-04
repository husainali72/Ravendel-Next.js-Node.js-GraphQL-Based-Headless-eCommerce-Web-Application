const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attributeSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute"
  },
  values: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductAttribute"
    }
  ],
})

const combinationSchema = new Schema({
  attributeId: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute",
    required: true
  },
  attributeValueId: {
    type: Schema.Types.ObjectId,
    ref: "ProductAttribute",
    required: true
  },
}, {_id: false})

const variationSchema = new Schema({
  combinations: [combinationSchema],
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  productUrl: {
    type: String
  }
})

// Create Schema
const ProductGroupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  status: String,
  attributes: [attributeSchema],
  variations: [variationSchema],
  productIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ]
}, {timestamps: true});

const ProductGroup = (module.exports = mongoose.model("ProductGroup", ProductGroupSchema));

const defaultProductGroups = [
  {
    title: "T-shirt Group",
    status: "Publish",
    attributes: [
      {
        _id: "5be3028e1304b8697e258e02",
        values: [
          "65cb2af0a9dfee40f95226d1",
          "65cb2af0a9dfee40f95226d2",
          "65cb2af0a9dfee40f95226d3",
        ]
      },
      {
        _id: "5be3028e1304b8697e258e03",
        values: [
          "663e1986fb7a278d2900f0e0",
          "663e1986fb7a278d2900f0e1",
          "663e1986fb7a278d2900f0e2",
        ]
      }
    ],
    variations: [
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d1",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e0",
          },
        ],
        productId: "664f1ae23cc739384ba16321",
        productUrl: "men-s-red-moon-rider-graphic-printed-t-shirt-small",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d3",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e0",
          },
        ],
        productId: "664f1ae23cc739384ba16322",
        productUrl: "men-s-blue-moon-rider-graphic-printed-t-shirt-small",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d2",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e0",
          },
        ],
        productId: "664f1ae23cc739384ba16323",
        productUrl: "men-s-green-moon-rider-graphic-printed-t-shirt-small",
      },

      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d1",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
        ],
        productId: "664f1ae23cc739384ba16324",
        productUrl: "men-s-red-moon-rider-graphic-printed-t-shirt-med",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d3",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
        ],
        productId: "664f1ae23cc739384ba16325",
        productUrl: "men-s-blue-moon-rider-graphic-printed-t-shirt-med",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d2",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
        ],
        productId: "664f1ae23cc739384ba16326",
        productUrl: "men-s-green-moon-rider-graphic-printed-t-shirt-med",
      },

      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d1",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e2",
          },
        ],
        productId: "664f1ae23cc739384ba16327",
        productUrl: "men-s-red-moon-rider-graphic-printed-t-shirt-large",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d3",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e2",
          },
        ],
        productId: "664f1ae23cc739384ba16328",
        productUrl: "men-s-blue-moon-rider-graphic-printed-t-shirt-large",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d2",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e2",
          },
        ],
        productId: "664f1ae23cc739384ba16329",
        productUrl: "men-s-green-moon-rider-graphic-printed-t-shirt-large",
      },
    ],
    productIds: [
      "664f1ae23cc739384ba16321",
      "664f1ae23cc739384ba16322",
      "664f1ae23cc739384ba16323",
      "664f1ae23cc739384ba16324",
      "664f1ae23cc739384ba16325",
      "664f1ae23cc739384ba16326",
      "664f1ae23cc739384ba16327",
      "664f1ae23cc739384ba16328",
      "664f1ae23cc739384ba16329",
    ],
  },
  {
    title: "Mug Group",
    status: "Publish",
    attributes: [
      {
        _id: "5be3028e1304b8697e258e02",
        values: [
          "65cb2af0a9dfee40f95226d4",
          "65cb2af0a9dfee40f95226d5",
          "65cb2af0a9dfee40f95226d6",
        ]
      },
      {
        _id: "5be3028e1304b8697e258e03",
        values: [
          "663e1986fb7a278d2900f0e1",
        ]
      },
      {
        _id: "5be3028e1304b8697e258e01",
        values: [
          "65cb2b39a9dfee40f9522722",
        ]
      }
    ],
    variations: [
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d4",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16330",
        productUrl: "stainless-steel-mug-with-lid-set-of-2-pink-400ml",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d5",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16331",
        productUrl: "stainless-steel-mug-with-lid-set-of-2-grey-400ml",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d6",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16332",
        productUrl: "stainless-steel-mug-with-lid-set-of-2-white-400ml",
      },
    ],
    productIds: [
      "664f1ae23cc739384ba16330",
      "664f1ae23cc739384ba16331",
      "664f1ae23cc739384ba16332",
    ],
  },
  {
    title: "Bottle Group",
    status: "Publish",
    attributes: [
      {
        _id: "5be3028e1304b8697e258e02",
        values: [
          "65cb2af0a9dfee40f95226d0",
          "65cb2af0a9dfee40f95226d6",
        ]
      },
      {
        _id: "5be3028e1304b8697e258e03",
        values: [
          "663e1986fb7a278d2900f0e1",
          "663e1986fb7a278d2900f0e2",
        ]
      },
      {
        _id: "5be3028e1304b8697e258e01",
        values: [
          "65cb2b39a9dfee40f9522722",
        ]
      }
    ],
    variations: [
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d6",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16340",
        productUrl: "insulated-thermos-stainless-steel-water-bottle-white-1l-med",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d0",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e1",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16341",
        productUrl: "insulated-thermos-stainless-steel-water-bottle-black-1l-med",
      },

      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d6",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e2",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16342",
        productUrl: "insulated-thermos-stainless-steel-water-bottle-white-1l-large",
      },
      {
        combinations: [
          {
            attributeId: "5be3028e1304b8697e258e02",
            attributeValueId: "65cb2af0a9dfee40f95226d0",
          },
          {
            attributeId: "5be3028e1304b8697e258e03",
            attributeValueId: "663e1986fb7a278d2900f0e2",
          },
          {
            attributeId: "5be3028e1304b8697e258e01",
            attributeValueId: "65cb2b39a9dfee40f9522722",
          },
        ],
        productId: "664f1ae23cc739384ba16343",
        productUrl: "insulated-thermos-stainless-steel-water-bottle-black-1l-large",
      },
    ],
    productIds: [
      "664f1ae23cc739384ba16340",
      "664f1ae23cc739384ba16341",
      "664f1ae23cc739384ba16342",
      "664f1ae23cc739384ba16343",
    ],
  },
]

module.exports.createDefaultProductGroups = async () => {
  const existingproductGroups = await ProductGroup.findOne({});
  if (existingproductGroups) {
    return;
  }
  
  const productGroups = await ProductGroup.insertMany(defaultProductGroups)
};
