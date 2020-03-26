const { gql } = require("apollo-server-express");
module.exports = gql`
  type Page {
    id: ID
    title: String
    content: String
    status: String
    url: String
    meta: customObject
    createdAt: Date
    updatedAt: Date
  }

  extend type Query {
    pages: [Page]
    page(id: ID!): Page
  }

  extend type Mutation {
    addPage(
      title: String
      content: String
      status: String
      url: String
      meta: customObject
    ): [Page]
    updatePage(
      id: ID!
      title: String
      content: String
      status: String
      url: String
      meta: customObject
    ): [Page]
    deletePage(id: ID!): [Page]
  }
`;
