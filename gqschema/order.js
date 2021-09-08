const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order {
    _id: ID
    user_id: ID
    status: String
    shipping: customObject
    billing: customObject
    products: customArray
    date: Date
    updated: Date
  }

  input orderProduct {
    product_id: ID
    qty: Int
  }

  type OResult {
    orders: [Order]
    currentPage: Int
    totalPages: Int
    totalCount:Int
  }

  

  extend type Query {
    orders(search: String, page: Int, limit: Int): OResult
    order(id: ID!): Order
    orderbyUser(user_id: ID!): Order
  }

  extend type Mutation {
    addOrder(
      user_id: ID
      billing: customObject
      shipping: customObject
      products: customArray
      status: String
    ): [Order]
    updateOrder(
      id: ID
      billing: customObject
      shipping: customObject
      status: String
    ): [Order]
    deleteOrder(id: ID!): [Order]
  }
`;
