const { gql } = require("apollo-server-express");
module.exports = gql`
  type Page {
    name: String
    description: String
    status: String
    slug: String
    id: ID
    meta: pageMeta
    date: Date
    updated: Date
  }

  type pageMeta {
    meta(key: String, value: String): metaKeyValueArray
  }

  extend type Query {
    pages: [Page]
    page(id: ID!): Page
    pagesbyMeta(key: String, value: String): [Page]
  }
  extend type Mutation {
    addPage(name: String, description: String, status: String): Page
    updatePage(
      id: ID!
      name: String
      description: String
      status: String
      slug: String
      meta: [Meta]
    ): Page
    deletePage(id: ID!): Boolean!
  }
`;
