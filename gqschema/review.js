// const { gql } = require("@apollo/server");
module.exports = `
  type Review {
    id: ID
    title: String
    customerId: Customer
    productId: Product
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
  type ReviewIdRES {
    data: Review
    message: statusSchema
  }
  type ReviewRES {
    data: [Review]
    message: statusSchema
  }
  type productwise_Review {
    data: [Review]
    message: statusSchema
  }
  type productwisereviewResponse {
    count: Int
    reviews: [Review]
  }
  extend type Query {
    reviews: ReviewRES
    reviews_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): reviewsResponse
    review(id: ID!): ReviewIdRES
    productwisereview(
      productId: ID!
      page: Int
      limit: Int
    ): productwisereviewResponse
  }

  extend type Mutation {
    addReview(
      title: String
      customerId: String
      productId: String
      email: String
      review: String
      rating: String
      status: String
    ): statusSchema
    updateReview(
      id: ID!
      title: String
      customerId: String
      productId: String
      email: String
      review: String
      rating: String
      status: String
    ): statusSchema
    deleteReview(id: ID!): statusSchema
  }
  
`;
