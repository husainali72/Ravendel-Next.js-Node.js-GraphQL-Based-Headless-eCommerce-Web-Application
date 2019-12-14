const jwt = require("jsonwebtoken");
const APP_KEYS = require("../config/keys");

module.exports = function(req, res, next) {
  //get token from header
  const token = req.header("authorization");

  //check if not token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }

  //verify token
  try {
    const decode = jwt.verify(token, APP_KEYS.jwtSecret);
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
