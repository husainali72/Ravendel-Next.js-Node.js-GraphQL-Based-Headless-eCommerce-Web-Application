// const { gql } = require("@apollo/server");
module.exports = `
  type Shipping {
    id: ID
    global: customObject
    shippingClass: [customObject]
    date: Date
    updated: Date
  }
  type shipping_RES {
    data: Shipping
    message: statusSchema
  }
  extend type Query {
    shipping: shipping_RES
  }

  extend type Mutation {
    updateGlobalShipping(global: customObject): statusSchema
    addShippingClass(shippingClass: customObject): statusSchema
    updateShippingClass(shippingClass: customObject): statusSchema
    deleteShippingClass(_id: String): statusSchema
  }
`;
