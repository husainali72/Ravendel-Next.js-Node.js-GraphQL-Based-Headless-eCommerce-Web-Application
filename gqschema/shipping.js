const { gql } = require("apollo-server-express");
module.exports = gql`
  type Shipping {
    id: ID
    global: customObject
    shipping_class: [customObject]
    date: Date
    updated: Date
  }
  type shipping_RES {
    data:Shipping
    message: statusSchema
  }
  extend type Query {
    shipping: shipping_RES
  }

  extend type Mutation {
    updateGlobalShipping(global: customObject): Shipping
    addShippingClass(shipping_class: customObject): Shipping
    updateShippingClass(shipping_class: customObject): Shipping
    deleteShippingClass(_id: String): Shipping
  }
`;
