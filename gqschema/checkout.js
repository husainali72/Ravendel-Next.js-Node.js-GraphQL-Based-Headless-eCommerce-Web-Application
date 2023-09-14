const { gql } = require("apollo-server-express");
module.exports = gql`
  type Checkout {
    id: ID
    userId: ID
    shipping: customObject
    payment: customObject
    products: metaKeyValueArray
    status: String
    date: Date
    updated: Date
  }

  input checkoutProduct {
    productId: ID
    qty: Int
    total: Float
  }

  extend type Query {
    checkouts: [Checkout]
    checkout(id: ID!): Checkout
    checkoutbyUser(userId: ID!): Checkout
  }

  extend type Mutation {
    addCheckout(userId: ID, products: [checkoutProduct]): Checkout
    deleteCheckout(id: ID!): Boolean!
  }
`;
