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
/* const User = require("../../models/User");
const ProductCat = require("../../models/ProductCat"); */
const Product = require("../../models/Product");
const CatTree = require("../../models/CatTree");
const ProductAttributeVariation = require("../../models/ProductAttributeVariation");

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

router.get("/testing", async (req, res) => {
  try {
    /*let filterObj = {
      categoryId: {
        $in: ["5e81875141738428396af6c8", "5e81b11e41738428396af768"],
      },
      status: "Publish",
      brand: "5efad76585734b0bf9674415",
      $and: [
        {
          "attribute.attribute_id": "5efb4205f84b3c35b088fb97",
        },
        {
          "attribute.attribute_id": "5e81b11e41738428396af768",
        },
      ],
      /*attribute: {
        attribute_value_id: {
          $or: [
            { attribute_value_id: "5f0c0495672afc2e00e9c10c" },
            { attribute_value_id: "5e81b11e41738428396af768" },
          ],
        },
      },
    };*/

    let findArr = [
      {
        $match: {
          categoryId: {
            $in: ["5e81875141738428396af6c8"],
          },
          status: "Publish",
          brand: {
            $in: ["5efad76585734b0bf9674415"],
          },
        },
      },
      {
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
      },
    ];

    const Masters = await Product.aggregate(findArr);
    console.log(JSON.stringify(findArr));
    res.json({
      success: true,
      response: Masters,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

router.get("/update_product", async (req, res) => {
  /* const cat = await CatTree.updateOne({ parent: "" }, [
    { $set: { parent: "$_id" } },
  ]); */

  Product.aggregate(
    [
      {
        $match: {
          //brand: { $exists: true },
          categoryId: {
            $in: [
              "5e81875141738428396af6c8",
              "5e8187e441738428396af6c9",
              "5f06ece3d2d24f46a2d4eb53",
              "5f06ecf0d2d24f46a2d4eb54",
              "5f06f119d2d24f46a2d4eb5b",
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            brand: { $toObjectId: "$brand" },
          },
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id.brand",
          foreignField: "_id",
          as: "brandMaster",
        },
      },
      { $unwind: "$brandMaster" },
    ],
    function (err, result) {
      console.log(err);
      res.json({
        success: true,
        response: result,
      });
    }
  );
});

router.get("/block_ads", async (req, res) => {});

module.exports = router;

/* let filterObj = [
  {
    status: "Publish",
  },
];

if (args.config.category.length) {
  let cats = await getTree(args.config.category[0]);
  cats = cats.length ? cats : args.config.category;
  filterObj[0].categoryId = { $in: cats };
}

if (args.config.brand.length) {
  filterObj[0].brand = args.config.brand[0];
}

for (const id of args.config.attribute) {
  filterObj.push({ "attribute.attribute_value_id": id });
}

const products = await Product.find({
  $and: filterObj,
}); */
