const { gql } = require("apollo-server-express");
module.exports = gql`
  type Coupon {
    id: ID
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
  type Pagination {
    totalCount: Int
    page: Int
  }

  type couponResponse {
    data: [Coupon]
    meta_data: Pagination
  }

  extend type Query {
    coupons_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): couponResponse
    coupons: [Coupon]
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
