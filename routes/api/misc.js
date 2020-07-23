const express = require("express");
const router = express.Router();

const APP_KEYS = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

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
const ProductCat = require("../../models/ProductCat");
const Product = require("../../models/Product"); */
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

module.exports = router;
