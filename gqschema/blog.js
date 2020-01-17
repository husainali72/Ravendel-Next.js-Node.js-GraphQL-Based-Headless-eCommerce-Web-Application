const { gql } = require("apollo-server-express");
module.exports = gql`
  type Blog {
    id: ID
    title: String
    content: String
    status: String
    slug: String
    feature_image: customObject
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
    addBlog(
      title: String
      content: String
      status: String
      feature_image: Upload
    ): [Blog]
    updateBlog(
      id: ID!
      title: String
      content: String
      status: String
      updatedImage: Upload
      meta: [Meta]
    ): [Blog]
    deleteBlog(id: ID!): [Blog]
  }
`;
