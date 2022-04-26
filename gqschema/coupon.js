const { gql } = require("apollo-server-express");
module.exports = gql`
  type Coupon {
    id: ID
    code: String
    description: String
    discount_type: String
    discount_value: Int
    free_shipping: Boolean
    expire: String
    minimum_spend: Int
    maximum_spend: Int
    products: customArray
    exclude_products: customArray
    categories: customArray
    exclude_categories: customArray
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
      discount_type: String
      discount_value: Int
      free_shipping: Boolean
      expire: String
      minimum_spend: Int
      maximum_spend: Int
      products: customArray
      exclude_products: customArray
      categories: customArray
      exclude_categories: customArray
    ): statusSchema
    updateCoupon(
      id: ID!
      code: String
      description: String
      discount_type: String
      discount_value: Int
      free_shipping: Boolean
      expire: String
      minimum_spend: Int
      maximum_spend: Int
      products: customArray
      exclude_products: customArray
      categories: customArray
      exclude_categories: customArray
    ): statusSchema
    deleteCoupon(id: ID!): statusSchema
  }
`;
