const { gql } = require("apollo-server-express");
module.exports = gql`
  type Cart {
    id: ID
    userId: ID
    status: String
    total: String
    cartItem: metaKeyValueArray
    availableItem: customArray
    unavailableItem: customArray
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
    productId: ID
    productTitle:String
    productImage : String
    productPrice : String
    qty: Int,
    productTotal : String,
    productTax: String
    productShipping: String
  }

  type calculatedCart {
    totalShipping: String
    totalTax: String
    totalCoupon: Float
    grandTotal: String
    cartItem:[cartItem]
    cartTotal :String
  }

  input cartProduct {
    productId: ID
    qty: Int
    productTitle: String
    productPrice: Float
    productImage: String
    combination: [String]
    taxClass: String
    shippingClass: String
    productQuantity:Int
    attributes:customArray
    variantId:String
  }

  input calculateCartProducts {
    productId: ID
    qty: Int
    total: Float
    taxClass: String
    shippingClass: String
    variantId:String
    productTotal : String
  }

  input couponCartProducts {
    productId: ID
    qty: Int
    productImage : String
    productTitle : String
    productShipping : String
    productTax : String
    productPrice : String
    productTotal : String
    variantId:String
  }

  type calculateCouponCartItem {
    productId: ID
    qty: Int
    productImage : String
    productTitle : String
    productShipping : String
    productTax : String
    productPrice : String
    productTotal : String
    variantId:String
    discountGrandTotal : String
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
    totalCoupon: String
    message: String
    success: Boolean
    cartItem :[calculateCouponCartItem]
    cartTotal : String
    totalShipping : String
    totalTax : String,
  grandTotal:String
  discountGrandTotal : String
  }

  extend type Query {
    carts: CartRES
    cart(id: ID!): Cart
    cartbyUser(userId: ID!): Cart
    calculateCart(cartItem: [calculateCartProducts]): calculatedCart
    calculateCoupon(couponCode: String,cartItem: [couponCartProducts], totalShipping : String
      totalTax : String,grandTotal:String,cartTotal:String): calculateCoupon
  }

  extend type Mutation {
    addCart(userId: ID, total: Float, products: [cartProduct]): statusSchema
    updateCart(id: ID!, total: Float, products: [cartProduct]): statusSchema
    changeQty(userId: ID!, productId: ID!, qty: Int!): statusSchema
    deleteCart(id: ID!): statusSchema
    deleteCartProduct(id: ID!, productId: ID!): statusSchema
    addToCart(
      userId: ID
      total: Float
      productId: String
      productTitle: String
      productPrice: Float
      productImage: String
      qty: Int
      attributes:customArray
      variantId:String
      productQuantity:Int
      shippingClass : String,
      taxClass : String

    ): statusSchema
  }
`;