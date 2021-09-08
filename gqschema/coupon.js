const { gql } = require("apollo-server-express");
module.exports = gql`
  type Coupon {
    _id: ID
    code: String
    description: String
    discount_type: String
    discount_value: String
    free_shipping: Boolean
    expire: String
    minimum_spend: String
    maximum_spend: String
    products: customArray
    exclude_products: customArray
    categories: customArray
    exclude_categories: customArray
    date: Date
    updated: Date
  }


  type OCResult {
    coupons: [Coupon]
    currentPage: Int
    totalPages: Int
    totalCount:Int
  }

  extend type Query {
    coupons(search: String, page: Int, limit: Int): OCResult
    coupon(id: ID!): Coupon
  }

  extend type Mutation {
    addCoupon(
      code: String
      description: String
      discount_type: String
      discount_value: String
      free_shipping: Boolean
      expire: String
      minimum_spend: String
      maximum_spend: String
      products: customArray
      exclude_products: customArray
      categories: customArray
      exclude_categories: customArray
    ): [Coupon]
    updateCoupon(
      id: ID!
      code: String
      description: String
      discount_type: String
      discount_value: String
      free_shipping: Boolean
      expire: String
      minimum_spend: String
      maximum_spend: String
      products: customArray
      exclude_products: customArray
      categories: customArray
      exclude_categories: customArray
    ): [Coupon]
    deleteCoupon(id: ID!): [Coupon]
  }
`;
