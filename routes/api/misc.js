const express = require("express");
const router = express.Router();

const APP_KEYS = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

var mongoose = require("mongoose");

const {
  isEmpty,
  putError,
  checkError,
  imageUpload,
  imageUnlink,
  checkToken,
  stringTourl,
  validateUrl,
  updateUrl,
} = require("../../config/helpers");

// user model
const User = require("../../models/User");
//const ProductCat = require("../../models/ProductCat");
const Product = require("../../models/Product");

const Customer = require("../../models/Customer");
//const CatTree = require("../../models/CatTree");
const ProductAttributeVariation = require("../../models/ProductAttributeVariation");
//const ProductLog = require("../../models/ProductLog");

router.post("/checkurl", auth, async (req, res) => {
  try {
    var url = await updateUrl(req.body.url, req.body.table);
    res.json({
      success: true,
      url: url,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.post("/delete_variation", auth, async (req, res) => {
  try {
    const variant = await ProductAttributeVariation.findByIdAndRemove(
      req.body.id
    );
    if (variant.image) {
      imageUnlink(variant.image);
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.post("/delete_image", auth, async (req, res) => {
  try {
    console.log(req.body.image);
    if (req.body.image) {
      imageUnlink(req.body.image);
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.post("/add_log", auth, async (req, res) => {
  try {
    const ProductLog = new ProductLog({
      productId: req.body.productId,
      customer_id: req.body.customer_id || null,
    });

    await ProductLog.save();

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.post("/dashboard_data", auth, async (req, res) => {
  try {
    //auth
    const dashBoardData = {};
    dashBoardData.product_count = await Product.countDocuments({
      status: "Publish",
    });
    dashBoardData.user_count = await User.countDocuments({});
    dashBoardData.customer_count = await Customer.countDocuments({});
    dashBoardData.latest_products = await Product.find({})
      .sort({ date: "desc" })
      .limit(2);

    res.json({
      success: true,
      dashBoardData,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.get("/testing", async (req, res) => {
  try {
    let filterObj = {
      categoryId: {
        $in: ["5e81875141738428396af6c8", "5e81b11e41738428396af768"],
      },
      status: "Publish",
      brand: "5efad76585734b0bf9674415",
      $or: [
        {
          "pricing.saleprice": {
            $gt: 100,
            $lte: 200,
          },
        },
        {
          "pricing.price": {
            $gt: 100,
            $lte: 200,
          },
        },
      ],
      $and: [
        {
          "attribute.attribute_id": "5efb4205f84b3c35b088fb97",
        },
        {
          "attribute.attribute_id": "5e81b11e41738428396af768",
        },
      ],

      attribute: {
        attribute_value_id: {
          $or: [
            { attribute_value_id: "5f0c0495672afc2e00e9c10c" },
            { attribute_value_id: "5e81b11e41738428396af768" },
          ],
        },
      },
    };

    let findArr = [
      {
        $match: {
          categoryId: {
            $in: ["5e81875141738428396af6c8"],
          },
          status: "Publish",
          brand: {
            $in: [
              mongoose.Types.ObjectId("5efad76585734b0bf9674413"),
              mongoose.Types.ObjectId("5ef9c93e333dfc7d09d9df90"),
            ],
          },
        },
      },
      {
        $project: {
          name: "$name",
          brand: "$brand",
          categoryId: "$categoryId",
        },
      },
      /* {
        $match: {
          "attribute.attribute_id": mongoose.Types.ObjectId(
            "5efb4205f84b3c35b088fb97"
          ),
        },
      },
      {
        $match: {
          "attribute.attribute_id": mongoose.Types.ObjectId(
            "5f0c0495672afc2e00e9c10b"
          ),
        },
      },
      {
        $match: {
          "attribute.attribute_value_id": {
            $in: [mongoose.Types.ObjectId("5efd6f4eab130d037cc65853")],
          },
        },
      },
      {
        $match: {
          "attribute.attribute_value_id": {
            $in: [mongoose.Types.ObjectId("5f0c0495672afc2e00e9c10c")],
          },
        },
      }, */
    ];

    //const Masters = await Product.aggregate(findArr);

    /* const Masters = await Product.find({brand: mongoose.Types.ObjectId("5efad76585734b0bf9674413"), status: "Publish", categoryId: {
      $in: ["5e81875141738428396af6c8"],
    } }, 'name brand categoryId' ); */

    res.json({
      success: true,
      response: await ProductAttributeVariation.find({
        productId: "5f1182f226104110805cb3a0",
      }), //ProductAttributeVariation.find({ combination: { $in : {productId: { $exists: true } } }  }),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.get("/update_product", async (req, res) => {
  /* const cat = await ProductAttributeVariation.updateMany([
    {
      $set: {
        "pricing.price": "$price",
        "pricing.saleprice": 0,
      },
    },
  ]);

  res.json({
    success: true,
    response: cat,
  }); */

  /* const result = await ProductAttributeVariation.find({
    price: { $gte: 0, $lte: 200 },
  })
    .populate({ path: "productId" })
    .select(["price", "createdAt"]); */

  /* const result = await ProductAttributeVariation.find({
    $or: [
      {
        "pricing.saleprice": {
          $gt: 0,
          $lte: 200000,
        },
      },
      {
        "pricing.price": {
          $gt: 0,
          $lte: 200000,
        },
      },
    ],
  })
    .populate({ path: "productId", select: ["name", "pricing"] })
    .select(["pricing", "createdAt"]); */

  const result = await Product.find({
    $and: [
      {
        status: "Publish",
      },
      {
        "pricing.sellprice": {
          $ne: null,
        },
      },
      {
        "pricing.sellprice": {
          $ne: 0,
        },
      },
    ],
  })
    .sort({ $natural: -1 })
    .limit(10);

  console.log(result.length);

  res.json({
    success: true,
    response: result,
  });
});

router.get("/test1", async (req, res) => {
  try {
    let findArr = [
      {
        $match: {
          _id: {
            $in: [
              mongoose.Types.ObjectId("5f8d271178fcd605d8c2cb90"),
              mongoose.Types.ObjectId("5f8d271178fcd605d8c2cb90"),
            ],
          },
        },
      },
      { $unwind: "$_id" },
    ];

    res.json({
      success: true,
      response: await Product.aggregate(findArr),
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

module.exports = router;
