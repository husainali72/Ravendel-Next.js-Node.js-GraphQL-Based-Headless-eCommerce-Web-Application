const { AuthenticationError } = require("@apollo/server");
const APP_KEYS = require("./config/keys");
const jwt = require("jsonwebtoken");
const { isEmpty, checkToken } = require("./config/helpers");
const Customer = require("./models/Customer");
const User = require("./models/User");
module.exports = async ({ req }) => {
  try {
    const token = req.header("authorization") || "";
    if (isEmpty(token)) {
      return { id: false };
    }
    //return ({ id, email, name } = jwt.verify(token, APP_KEYS.jwtSecret));
    let { id, email, name, role } = jwt.verify(token, APP_KEYS.jwtSecret);
    // console.log({ id, email, name, role });

    if (role === "customer") {
      let customer = await Customer.findOne({ _id: id, status: "ACTIVE" });

      if (!customer) {
        return { id: false };
      }
    } else if (role === "admin") {
      let user = await User.findOne({ _id: id });
      if (!user) {
        return { id: false };
      }
    }
    else {
      return { id: false };
    }
    return { id, email, name, role };
  } catch (e) {
    checkToken(false);
    /* throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    ); */
  }
};
