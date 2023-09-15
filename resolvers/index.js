const { GraphQLDateTime } = require("graphql-iso-date");

const userResolvers = require("./user");
const pageResolvers = require("./page");
const blogResolvers = require("./blog");
const productResolvers = require("./product");
const cartResolvers = require("./cart");
const checkoutResolvers = require("./checkout");
const orderResolvers = require("./order");
const customerResolvers = require("./customer");
const brandResolvers = require("./brand");
const settingResolvers = require("./setting");
const taxResolvers = require("./tax");
const shippingResolvers = require("./shipping");
const couponResolvers = require("./coupon");
const reviewResolvers = require("./review");
const productAttribute = require("./product_attribute");
const zipcodeResolvers = require("./zipcode");
const faqResolvers = require("./faq");

const customScalarResolver = {
  Date: GraphQLDateTime,
};

const metaKeyValueArray = {
  metaKeyValueArray: [],
};

const customArray = {
  customArray: [],
};

const customObject = {
  customObject: {},
};
module.exports = [
  customScalarResolver,
  metaKeyValueArray,
  customArray,
  customObject,
  userResolvers,
  pageResolvers,
  blogResolvers,
  productResolvers,
  cartResolvers,
  checkoutResolvers,
  orderResolvers,
  customerResolvers,
  brandResolvers,
  settingResolvers,
  taxResolvers,
  shippingResolvers,
  couponResolvers,
  reviewResolvers,
  productAttribute,
  faqResolvers,
  zipcodeResolvers,
  productAttribute
];
