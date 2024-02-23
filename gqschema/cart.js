const { gql } = require("apollo-server-express");
module.exports = gql`
  type Cart {
    id: ID
    userId: ID
    status: String
    cartItems: metaKeyValueArray
    date: Date
    updated: Date
    totalSummary:metaKeyValueArray
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
    available: Boolean
    amount : String
    taxAmount : String
    shippingAmount : String
    total : String
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
    productPrice: String
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
    message: String
    success: Boolean
    cartItems :[calculateCouponCartItem]
    totalSummary:metaKeyValueArray
  }

  type totalSummary {
    cartTotal: String,
    discountTotal: String
    couponDiscountTotal: String
    totalTax: String
    totalShipping: String
    grandTotal: String
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
    deleteCart(userId: ID!): statusSchema
    deleteCartProduct(userId: ID!, productId: ID!): statusSchema
    addToCart(
      userId: ID
      total: Float
      productId: String
      productTitle: String
      productPrice: String
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