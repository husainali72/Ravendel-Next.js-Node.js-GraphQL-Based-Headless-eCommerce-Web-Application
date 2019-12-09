const { gql } = require("apollo-server-express");
module.exports = gql`
  type Checkout {
    id: ID
    user_id: ID
    shipping: customObject
    payment: customObject
    products: metaKeyValueArray
    status: String
    date: Date
    updated: Date
  }

  input checkoutProduct {
    product_id: ID
    qty: Int
    total: Float
  }

  extend type Query {
    checkouts: [Checkout]
    checkout(id: ID!): Checkout
    checkoutbyUser(user_id: ID!): Checkout
  }

  extend type Mutation {
    addCheckout(user_id: ID, products: [checkoutProduct]): Checkout
    deleteCheckout(id: ID!): Boolean!
  }
`;
