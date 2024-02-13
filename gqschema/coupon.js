// const { gql } = require("@apollo/server");
module.exports = `
  type Coupon {
    id: ID
    code: String
    description: String
    discountType: String
    discountValue: Float
    freeShipping: Boolean
    expire: String
    minimumSpend: Int
    maximumSpend: Int
    product: Boolean
    includeProducts: customArray
    excludeProducts: customArray
    category: Boolean
    includeCategories: customArray
    excludeCategories: customArray
    date: Date
    updated: Date
  }
  

  type couponResponse {
    data: [Coupon]
    pagination: paginationInfo
    message: statusSchema
  }
  type couponIdRES {
    data: Coupon
    message: statusSchema
  }
  type couponRES {
    data: [Coupon]
    message: statusSchema
  }
  extend type Query {
    coupons_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): couponResponse
    coupons: couponRES
    coupon(id: ID!): couponIdRES
  }

  extend type Mutation {
    addCoupon(
      code: String
      description: String
      discountType: String
      discountValue: Float
      freeShipping: Boolean
      expire: String
      minimumSpend: Int
      maximumSpend: Int
      product: Boolean
      includeProducts: customArray
      excludeProducts: customArray
      category: Boolean
      includeCategories: customArray
      excludeCategories: customArray
    ): statusSchema
    updateCoupon(
      id: ID!
      code: String
      description: String
      discountType: String
      discountValue: Float
      freeShipping: Boolean
      expire: String
      minimumSpend: Int
      maximumSpend: Int
      product: Boolean
      includeProducts: customArray
      excludeProducts: customArray
      category: Boolean
      includeCategories: customArray
      excludeCategories: customArray
    ): statusSchema
    deleteCoupon(id: ID!): statusSchema
  }
`;
