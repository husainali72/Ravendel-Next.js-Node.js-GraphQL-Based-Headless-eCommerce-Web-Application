const { gql } = require("apollo-server-express");
module.exports = gql`
  type Order {
    id: ID
    orderNumber: String
    customerId: ID
    paymentStatus: String
    shippingStatus: String
    shipping: customObject
    billing: customObject
    products: customArray
    date: Date
    updated: Date
    subtotal: String
    shippingAmount: String
    taxAmount: String
    couponCode: String
    discountAmount: String
    grandTotal: String
  }

  input orderProduct {
    productId: ID
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
    orderbyUser(userId: ID!): OrderByUser
  }

  extend type Mutation {
    addOrder(
      customerId: ID
      orderNumber: String
      billing: customObject
      shipping: customObject
      products: customArray   
      cartTotal : String
      shippingAmount: String
      taxAmount: String
      couponCode: String
      attributes:customArray
      discountAmount: String
      grandTotal: String
    ): statusSchema
    updateOrder(
      id: ID
      billing: customObject
      shipping: customObject
      paymentStatus: String
      shippingStatus: String
    ): statusSchema
    deleteOrder(id: ID!): statusSchema
  }
`;
