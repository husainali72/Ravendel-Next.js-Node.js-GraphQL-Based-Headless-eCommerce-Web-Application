const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order {
    id: ID
    customer_id: ID
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
  type OrderIdRES {
    data: Order
    message: statusSchema
  }
  type OrderRES {
    data: [Order]
    message: statusSchema
  }
  type OrderByUser {
    data: Order
    message: statusSchema
  }
  extend type Query {
    orders: OrderRES
    order(id: ID!): OrderIdRES
    orderbyUser(user_id: ID!): OrderByUser
  }

  extend type Mutation {
    addOrder(
      customer_id: ID
      billing: customObject
      shipping: customObject
      products: customArray
      status: String
    ): statusSchema
    updateOrder(
      id: ID
      billing: customObject
      shipping: customObject
      status: String
    ): statusSchema
    deleteOrder(id: ID!): statusSchema
  }
`;
