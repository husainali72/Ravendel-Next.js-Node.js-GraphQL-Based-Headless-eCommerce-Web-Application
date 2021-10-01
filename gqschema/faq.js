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

  type MessageSchemaFaq {
    message: String
    statuscode: Int
  }

  type RESfaq {
    totalCount: Int
    page: Int
  }
  type Responsefaq {
    data: [Page]
    pagination: RESfaq
    message: MessageSchemaFaq
  }

  extend type Query {
    Faq_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): Responsefaq
    faqs: [Faq]
    faq(id: ID!): Faq
  }
  extend type Mutation {
    addFaq(
      title: String
      content: String
      status: String
    ): MessageSchemaFaq
    updateFaq(
      id: ID!
      title: String
      content: String
      status: String
    ): MessageSchemaFaq
    deleteFaq(id: ID!): MessageSchemaFaq
  }
`;