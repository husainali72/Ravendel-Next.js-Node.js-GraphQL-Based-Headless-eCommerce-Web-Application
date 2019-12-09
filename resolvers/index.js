const { GraphQLDateTime } = require("graphql-iso-date");

const userResolvers = require("./user");
const pageResolvers = require("./page");
const blogResolvers = require("./blog");
const productResolvers = require("./product");
const cartResolvers = require("./cart");
const checkoutResolvers = require("./checkout");
const orderResolvers = require("./order");

const customScalarResolver = {
  Date: GraphQLDateTime
};

const metaKeyValueArray = {
  metaKeyValueArray: []
};

const customObject = {
  customObject: {}
};
module.exports = [
  customScalarResolver,
  metaKeyValueArray,
  customObject,
  userResolvers,
  pageResolvers,
  blogResolvers,
  productResolvers,
  cartResolvers,
  checkoutResolvers,
  orderResolvers
];
