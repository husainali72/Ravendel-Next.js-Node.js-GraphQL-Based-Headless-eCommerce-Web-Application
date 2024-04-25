// const { gql } = require("@apollo/server");
const userSchema = require("./user");
const pageSchema = require("./page");
const blogSchema = require("./blog");
const productSchema = require("./product");
const groupSchema = require("./group");
const cartSchema = require("./cart");
const checkoutSchema = require("./checkout");
const orderSchema = require("./order");
const customerSchema = require("./customer");
const brand = require("./brand");
const setting = require("./setting");
const tax = require("./tax");
const shipping = require("./shipping");
const coupon = require("./coupon");
const review = require("./review");
const productAttribute = require("./product_attribute");
const faqSchema = require("./faq");
const miscSchema = require("./misc");
const zipcodeSchema = require("./zipcode");

const linkSchema = `
  scalar Date
  scalar metaKeyValueArray
  scalar customObject
  scalar customArray
  scalar Upload
  type Mutation {
    Upload(file: Upload!): File!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input Meta {
    key: String
    value: String
  }

  type generalResponse {
    success: Boolean
    message: String
  }

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  miscSchema,
  userSchema,
  pageSchema,
  blogSchema,
  productSchema,
  groupSchema,
  cartSchema,
  checkoutSchema,
  orderSchema,
  customerSchema,
  brand,
  setting,
  tax,
  shipping,
  coupon,
  review,
  productAttribute,
  faqSchema,
  productAttribute, 
  zipcodeSchema,
];
