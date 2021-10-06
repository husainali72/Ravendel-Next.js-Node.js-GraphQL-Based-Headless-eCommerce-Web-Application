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

  type Faq_RESPONSE {
    data:  [Faq]
    pagination: paginationInfo
    message: statusSchema
  }
  type FAQ_BY_ID_RES{
    data :Faq
    message: statusSchema
  }
  extend type Query {
    Faq_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): Faq_RESPONSE
    faq(id: ID!): FAQ_BY_ID_RES
  }
  extend type Mutation {
    addFaq(
      title: String
      content: String
      status: String
    ): statusSchema
    updateFaq(
      id: ID!
      title: String
      content: String
      status: String
    ): statusSchema
    deleteFaq(id: ID!): statusSchema
  }
`;