const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order {
    id: ID
    user_id: ID
    status: String
    total: Float
    shipping: customObject
    billing: customObject
    products: metaKeyValueArray
    date: Date
    updated: Date
  }

  input orderProduct {
    product_id: ID
    qty: Int
    total: Float
  }

  extend type Query {
    orders: [Order]
    order(id: ID!): Order
    orderbyUser(user_id: ID!): Order
  }

  extend type Mutation {
    addOrder(user_id: ID, total: Float, products: [orderProduct]): Order
    deleteOrder(id: ID!): Boolean!
  }
`;
