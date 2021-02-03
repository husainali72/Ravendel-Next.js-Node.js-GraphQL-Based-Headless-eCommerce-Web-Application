const express = require("express");
const router = express.Router();

const APP_KEYS = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const Customer = require("../../models/Customer");

const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const catchAsync = require("../../utils/catchAsync");
const { customerService, tokenService } = require("../../services");

// @route   Post api/posts
// @desc    Registering user
// @access  public
router.post(
  "/register",
  catchAsync(async (req, res) => {
    console.log(req.body);
    const user = await customerService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  })
);

module.exports = router;
