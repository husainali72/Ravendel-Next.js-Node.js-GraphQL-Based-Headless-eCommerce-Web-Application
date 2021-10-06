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
    id: ID
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
    price: Float
    combination: customArray
    tax: taxObj
    shipping: shippingObj
  }

  type calculatedCart {
    items: [cartItem]
    subtotal: Float
    total_shipping: shippingObj
    total_tax: taxObj
    total_coupon: Float
    grand_total: Float
  }

  input cartProduct {
    product_id: ID
    qty: Int
    combination: [String]
  }
  type CartRES {
    data:[Cart]
    message: statusSchema
  }
  type Cart_by_id_RES {
    data:Cart
    message: statusSchema
  }
  extend type Query {
    carts: CartRES
    cart(id: ID!): Cart_by_id_RES 
    cartbyUser(user_id: ID!): Cart
    calculateCart(cart: [cartProduct]): calculatedCart
  }

  extend type Mutation {
    addCart(user_id: ID, total: Float, product: cartProduct): statusSchema
    updateCart(id: ID!, total: Float, products: [cartProduct]): statusSchema
    deleteCart(id: ID!): Boolean!
    deleteCartProduct(id: ID!, object_id: ID!): Cart
    addToCart(customer_id: ID, cart: [cartProduct]): generalResponse
  }
`;

/* type calculatedCart {
  items: [cartItem]
  subtotal: Float,
  total_shipping: shippingObj,
  total_tax: taxObj,
  total_coupon: Float,
  grand_total: Float,
} */
