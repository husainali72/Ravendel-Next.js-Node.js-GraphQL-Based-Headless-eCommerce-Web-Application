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
    /* const Masters = Product.aggregate(
      [
        {
          $match: {
            "attribute.0": { $exists: true },
            categoryId: { $in: ["5e81875141738428396af6c8"] },
            //status: "Draft",
          },
        },
        { $unwind: "$attribute" },
        {
          $group: {
            _id: {
              attribute_id: "$attribute.attribute_id",
              attribute_value_id: "$attribute.attribute_value_id",
            },
          },
        },
        {
          $lookup: {
            from: "productattributes",
            localField: "_id.attribute_id",
            foreignField: "_id",
            as: "attributeMaster",
          },
        },
        { $unwind: "$attributeMaster" },
      ],
      function (err, result) {
        res.json({
          success: true,
          response: result,
        });
      }
    ); */

    /* const Masters = Product.aggregate(
      [
        {
          $match: {
            //brand: { $exists: true },
            categoryId: { $in: ["5e81875141738428396af6c8"] },
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
        } /* 
        { $unwind: "$brandMaster" },
        {
          $project: {
            _id: 1,
            name: 1,
          },
        }, 
      ],
      function (err, result) {
        console.log(err);
        res.json({
          success: true,
          response: result,
        });
      }
    ); */

    /* const Masters = Product.aggregate(
      [
        {
          $match: {
            //brand: { $exists: true },
            categoryId: { $in: ["5e81875141738428396af6c8"] },
          },
        },
        { $unwind: "$brands" },
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
      ],
      function (err, result) {
        res.json({
          success: true,
          response: result,
        });
      }
    ); */

    /* const Masters = Product.aggregate(
      [
        { $unwind: "$attribute" },
        {
          $match: {
            attribute: {
              $elemMatch: {
                attribute_value_id: mongoose.Types.ObjectId(
                  "5efd6f4eab130d037cc65853"
                ),
              },
            },
            
          },
        },
      ],
      function (err, result) {
        console.log(err);
        res.json({
          success: true,
          response: result,
        });
      }
    ); */

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

    const Masters = Product.aggregate(
      [
        {
          $match: {
            categoryId: {
              $in: ["5e81875141738428396af6c8", "5e81b11e41738428396af768"],
            },
            status: "Publish",
            brand: "5efad76585734b0bf9674415",
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
              $in: [
                mongoose.Types.ObjectId("5efd70b9b0abdc1294c1dc2a"),
                mongoose.Types.ObjectId("5efd6f4eab130d037cc65853"),
              ],
            },
          },
        },
      ],
      function (err, result) {
        console.log(err);
        res.json({
          success: true,
          response: result,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404).json("Something went wrong");
  }
});

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
