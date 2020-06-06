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
} = require("../../config/helpers");

// user model
const User = require("../../models/User");
const ProductCat = require("../../models/ProductCat");
const Product = require("../../models/Product");

router.post("/checkurl", auth, async (req, res) => {
  try {
    var url = stringTourl(req.body.url);
    switch (req.body.table) {
      case "Product":
        var Table = require("../../models/Product");
        break;
      case "ProductCat":
        var Table = require("../../models/ProductCat");
        break;
      case "Blog":
        var Table = require("../../models/Blog");
        break;
    }

    var duplicate = true;
    while (duplicate) {
      let data = await Table.findOne({ url: url });
      if (data) {
        url = validateUrl(url);
      } else {
        duplicate = false;
        res.json({
          success: true,
          url: url,
        });
      }
    }
  } catch (error) {
    res.status(404).json("Something went wrong");
  }
});

module.exports = router;
