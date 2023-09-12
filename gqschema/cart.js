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
    product_title:String
    product_image : String
    product_price : String
    qty: Int,
    product_total : String,
    product_tax: String
    product_shipping: String
  }

  type calculatedCart {
    total_shipping: String
    total_tax: String
    total_coupon: Float
    grand_total: String
    cartItem:[cartItem]
    cart_total :String
  }

  input cartProduct {
    product_id: ID
    qty: Int
    product_title: String
    product_price: Float
    product_image: String
    combination: [String]
    tax_class: String
    shipping_class: String
    product_quantity:Int
    attributes:customArray
    variant_id:String
  }

  input cartProducts {
    product_id: ID
    qty: Int
    total: Float
    tax_class: String
    shipping_class: String
    variant_id:String
    product_total : String
  }

  input cartProductsCoupon {
    product_id: ID
    qty: Int
    total: Float
    product_image : String
    product_title : String
    product_shipping : String
    product_tax : String
    product_price : String
    variant_id:String
    product_total : String
  }

  type CartRES {
    data:[Cart]
    message: statusSchema
  } 
  type Cart_by_id_RES {
    data:Cart
    message: statusSchema
  }

  type calculateCoupon {
    total_coupon: Float
    message: String
    success: Boolean
  }

  extend type Query {
    carts: CartRES
    cart(id: ID!): Cart
    cartbyUser(user_id: ID!): Cart
    calculateCart(total_coupon : Float, cart: [cartProducts]): calculatedCart
    calculateCoupon(coupon_code: String,cart: [cartProductsCoupon]): calculateCoupon
  }

  extend type Mutation {
    addCart(user_id: ID, total: Float, products: [cartProduct]): statusSchema
    updateCart(id: ID!, total: Float, products: [cartProduct]): statusSchema
    changeQty(user_id: ID!, product_id: ID!, qty: Int!): statusSchema
    deleteCart(id: ID!): statusSchema
    deleteCartProduct(id: ID!, product_id: ID!): statusSchema
    addToCart(
      user_id: ID
      total: Float
      product_id: String
      product_title: String
      product_price: Float
      product_image: String
      qty: Int
      attributes:customArray
      variant_id:String
      product_quantity:Int
      shipping_class : String,
      tax_class : String

    ): statusSchema
  }
`;