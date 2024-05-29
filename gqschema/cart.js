// const { gql } = require("@apollo/server");
module.exports = `
  type Cart {
    message: String
    success: Boolean

    id: ID
    userId: ID
    status: String
    cartItems: metaKeyValueArray
    date: Date
    updated: Date
    couponCard: metaKeyValueArray
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
    url: String
    mrp: String
    discountPrice: String
    discountPercentage: String
    productPrice : String
    qty: Int,
    productTotal : String,
    productTax: String
    productShipping: String
    available: Boolean
    mrpAmount : String
    discountAmount : String
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
    attributes:customArray
    variantId:String
  }

  #input calculateCartProducts {
    #productId: ID
    #qty: Int
    #total: Float
    #taxClass: String
    #shippingClass: String
    #variantId:String
    #productTotal : String
  #}

  input calculateCartProducts {
    productId: ID
    variantId:String
    productTitle:String
    attributes:customArray
    qty: Int
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
    data:Cart
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

  type couponCard {
    couponApplied: Boolean,
    appliedCouponCode: String
    appliedCouponDiscount: String
    isCouponFreeShipping: Boolean
  }

  type totalSummary {
    cartTotal: String,
    discountTotal: String
    couponDiscountTotal: String
    totalTax: String
    totalShipping: String
    grandTotal: String
  }

  type validateCartProductsResponse {
    data: customArray
    message: statusSchema
  }

  extend type Query {
    carts: CartRES
    cart(id: ID!): Cart
    calculateCart(userId: ID, cartItems: [calculateCartProducts]): Cart
    cartAdditionalDetails(productIds: [ID]): customArray
    #calculateCart(cartItems: [calculateCartProducts]): calculatedCart
    #calculateCoupon(couponCode: String,cartItem: [couponCartProducts], totalShipping : String
      #totalTax : String,grandTotal:String,cartTotal:String): calculateCoupon
    calculateCoupon(userId: ID, cartItems: [calculateCartProducts], couponCode: String!): Cart
    getCartDetails(userId: ID): statusDataSchema
    validateCartProducts(products: customArray): customArray
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