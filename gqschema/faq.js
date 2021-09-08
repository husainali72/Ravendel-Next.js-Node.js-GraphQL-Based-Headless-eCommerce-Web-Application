const { gql } = require("apollo-server-express");
module.exports = gql`
  type Faq {
    _id: ID
    title: String
    content: String
    status: String
    date: Date
    updated: Date
  }


  type FaqResult {
    faqs: [Faq]
    currentPage: Int
    totalPages: Int
    totalCount:Int
  }

  extend type Query {
    faqs(search: String, page: Int, limit: Int): FaqResult
    faq(id: ID!): Faq
  }

  extend type Mutation {
    addFaq(
      title: String
      content: String
      status: String
    ): [Faq]
    updateFaq(
      id: ID!
      title: String
      content: String
      status: String
    ): [Faq]
    deleteFaq(id: ID!): [Faq]
  }
`;
