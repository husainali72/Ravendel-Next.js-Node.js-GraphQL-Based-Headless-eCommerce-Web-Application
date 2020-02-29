const { gql } = require("apollo-server-express");
const userSchema = require("./user");
const pageSchema = require("./page");
const blogSchema = require("./blog");
const productSchema = require("./product");
const cartSchema = require("./cart");
const checkoutSchema = require("./checkout");
const orderSchema = require("./order");
const customerSchema = require("./customer");

const linkSchema = gql`
  scalar Date
  scalar metaKeyValueArray
  scalar customObject
  scalar customArray

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  input Meta {
    key: String
    value: String
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
  userSchema,
  pageSchema,
  blogSchema,
  productSchema,
  cartSchema,
  checkoutSchema,
  orderSchema,
  customerSchema
];
