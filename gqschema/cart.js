const { gql } = require("apollo-server-express");
module.exports = gql`
  type Cart {
    id: ID
    user_id: ID
    status: String
    total: Float
    products: metaKeyValueArray
    date: Date
    updated: Date
  }

  input cartProduct {
    product_id: ID
    qty: Int
    total: Float
  }

  extend type Query {
    carts: [Cart]
    cart(id: ID!): Cart
    cartbyUser(user_id: ID!): Cart
  }

  extend type Mutation {
    addCart(user_id: ID, total: Float, product: cartProduct): Cart
    updateCart(id: ID!, total: Float, products: [cartProduct]): Cart
    deleteCart(id: ID!): Boolean!
    deleteCartProduct(id: ID!, object_id: ID!): Cart
  }
`;
