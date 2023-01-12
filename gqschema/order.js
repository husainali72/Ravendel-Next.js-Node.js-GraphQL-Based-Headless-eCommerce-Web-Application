const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order {
    id: ID
    customer_id: ID
    payment_status: String
    shipping_status: String
    shipping: customObject
    billing: customObject
    products: customArray
    sub_total_details: customObject
    sub_total_summary: customArray
    date: Date
    updated: Date
    subtotal: String
    shipping_amount: String
    tax_amount: String
    coupon_code: String
    discount_amount: String
    grand_total: String
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
    data: [Order]
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
      sub_total_details: customObject
      sub_total_summary: customArray
      subtotal: String
      shipping_amount: String
      tax_amount: String
      coupon_code: String
      discount_amount: String
      grand_total: String
    ): statusSchema
    updateOrder(
      id: ID
      billing: customObject
      shipping: customObject
      payment_status: String
      shipping_status: String
    ): statusSchema
    deleteOrder(id: ID!): statusSchema
  }
`;
