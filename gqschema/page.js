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
 
  type Response {
    data: [Page]
    pagination: paginationInfo
    message: statusSchema
  }

  type PageIdRES {
    data: Page
    message: statusSchema
  }
  type PageRES {
    data: [Page]
    message: statusSchema
  }
  extend type Query {
    page_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): Response
    pages: PageRES
    page(id: ID!): PageIdRES
  }

  extend type Mutation {
    addPage(
      title: String
      content: String
      status: String
      url: String
      meta: customObject
    ): statusSchema
    updatePage(
      id: ID!
      title: String
      content: String
      status: String
      url: String
      meta: customObject
    ): statusSchema
    deletePage(id: ID!): statusSchema
  }
`;
