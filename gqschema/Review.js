const { gql } = require("apollo-server-express");
module.exports = gql`
  type Review {
    id: ID
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

  type reviewsResponse {
    data: [Review]
    pagination: paginationInfo
    message: statusSchema
  }

  extend type Query {
    reviews: [Review]
    reviews_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): reviewsResponse
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
    ): statusSchema
    updateReview(
      id: ID!
      title: String
      customer_id: String
      product_id: String
      email: String
      review: String
      rating: String
      status: String
    ): statusSchema
    deleteReview(id: ID!): statusSchema
  }
  
`;
