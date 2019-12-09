const { gql } = require("apollo-server-express");
module.exports = gql`
  type Blog {
    name: String
    description: String
    status: String
    slug: String
    id: ID
    meta: blogMeta
    date: Date
    updated: Date
  }

  type blogMeta {
    meta(key: String, value: String): metaKeyValueArray
  }

  extend type Query {
    blogs: [Blog]
    blog(id: ID!): Blog
    blogsbyMeta(key: String, value: String): [Blog]
  }
  extend type Mutation {
    addBlog(name: String, description: String, status: String): Blog
    updateBlog(
      id: ID!
      name: String
      description: String
      status: String
      slug: String
      meta: [Meta]
    ): Blog
    deleteBlog(id: ID!): Boolean!
  }
`;
