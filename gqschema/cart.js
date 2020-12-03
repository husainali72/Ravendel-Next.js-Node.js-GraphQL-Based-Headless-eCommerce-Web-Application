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

  type combinationItem {
    id: ID,
    name: String
  }

  type taxObj {
    name: String
    amount: Float
  }

  type shippingObj {
    name: String
    amount: Float
  }

  type cartItem {
    product_id: ID
    qty: Int
    combination: customArray
    tax: taxObj,
    shipping: shippingObj,
  }

  type calculatedCart {
    items: [cartItem]
    subtotal: Float,
    total_shipping: shippingObj,
    total_tax: taxObj,
    total_coupon: Float,
    grand_total: Float,
  } 

  input cartProduct {
    product_id: ID
    qty: Int
    combination: [String]
  }

  extend type Query {
    carts: [Cart]
    cart(id: ID!): Cart
    cartbyUser(user_id: ID!): Cart
    calculateCart(cart: [cartProduct]): calculatedCart
  }

  extend type Mutation {
    addCart(user_id: ID, total: Float, product: cartProduct): Cart
    updateCart(id: ID!, total: Float, products: [cartProduct]): Cart
    deleteCart(id: ID!): Boolean!
    deleteCartProduct(id: ID!, object_id: ID!): Cart
    addToCart(customer_id: ID, cart: [cartProduct]): generalResponse    
  }
`;
