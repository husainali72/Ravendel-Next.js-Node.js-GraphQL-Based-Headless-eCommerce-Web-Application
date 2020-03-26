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

  extend type Query {
    reviews: [Review]
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
