const { AuthenticationError } = require("apollo-server-express");
const APP_KEYS = require("./config/keys");
const jwt = require("jsonwebtoken");

module.exports = ({ req }) => {
  const token = req.header("authorization") || "";
  try {
    return ({ id, email, name } = jwt.verify(token, APP_KEYS.jwtSecret));
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};
