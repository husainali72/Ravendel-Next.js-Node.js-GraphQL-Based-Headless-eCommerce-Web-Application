const { gql } = require("apollo-server-express");
module.exports = gql`
  type Review {
    _id: ID
    title: String
    customer_id: Customer
    product_id: Product
    email: String
    review: String
    rating: String
    status: String
    date: Date
    updated: Date
  }

  type RResult {
    reviews: [Review]
    currentPage: Int
    totalPages: Int
    totalCount:Int
  }

  extend type Query {
    reviews(search: String, page: Int, limit: Int): RResult
    review(id: ID!): Review
    productwisereview(product_id: ID!): [Review]
  }

  extend type Mutation {
    addReview(
      title: String
      customer_id: String
      product_id: String
      email: String
      review: String
      rating: String
      status: String
    ): [Review]
    updateReview(
      id: ID!
      title: String
      customer_id: String
      product_id: String
      email: String
      review: String
      rating: String
      status: String
    ): [Review]
    deleteReview(id: ID!): [Review]
  }
`;
