const { AuthenticationError } = require("apollo-server-express");
const APP_KEYS = require("./config/keys");
const jwt = require("jsonwebtoken");
const { isEmpty, checkToken } = require("./config/helpers");
module.exports = ({ req }) => {
  try {
    const token = req.header("authorization") || "";
    if (isEmpty(token)) {
      return { id: false };
    }
    return ({ id, email, name } = jwt.verify(token, APP_KEYS.jwtSecret));
  } catch (e) {
    checkToken(false);
    /* throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    ); */
  }
};
