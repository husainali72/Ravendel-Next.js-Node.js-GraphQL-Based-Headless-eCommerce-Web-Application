// const { gql } = require("@apollo/server");
module.exports = `
  type Order {
    id: ID
    orderNumber: String
    userId: ID
    paymentStatus: String
    shippingStatus: String
    shipping: customObject
    billing: customObject
    products: customArray
    date: Date
    updated: Date
    cartTotal: String
    shippingAmount: String
    taxAmount: String
    couponCode: String
    discountAmount: String
    discountGrandTotal :String
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
  type AddOrderResponse {
    message: String
    success: Boolean
    redirectUrl: String
  }
  extend type Query {
    orders: OrderRES
    order(id: ID!): OrderIdRES
    orderbyUser(userId: ID!): OrderByUser
  }

  extend type Mutation {
    addOrder(
      userId: ID
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
    ): AddOrderResponse
    updateOrder(
      id: ID
      billing: customObject
      shipping: customObject
      paymentStatus: String
      shippingStatus: String
    ): statusSchema
    updatePaymentStatus(
      id: ID!
      paymentStatus: String!
    ): statusSchema
    deleteOrder(id: ID!): statusSchema
  }
`;
