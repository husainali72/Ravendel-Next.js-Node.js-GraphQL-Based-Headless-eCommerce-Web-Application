const { gql } = require("apollo-server-express");
module.exports = gql`
  type Blog {
    id: ID
    title: String
    content: String
    status: String
    blog_tag: customArray
    url: String
    feature_image: customObject
    meta: customObject
    date: Date
    updated: Date
  }

  type BlogTag {
    id: ID
    name: String
    url: String
    date: Date
    updated: Date
  }

  type MessageSchema {
    message: String
    statuscode: Int
  }

  type paginationRES {
    totalCount: Int
    page: Int
  }
  type blogResponse {
    data: [Blog]
    pagination: paginationRES
    message: MessageSchema
  }

  type blogTagsRes {
    data: [BlogTag]
    pagination: paginationRES
    message: MessageSchema
  }


  type blogTagsRes {
    data: [BlogTag]
    pagination: paginationRES
  }
  extend type Query {
    blogs: [Blog]
    blog_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): blogResponse
    blog(id: ID!): Blog
    blogtags: [BlogTag]
    blogTags_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): blogTagsRes
    blogsbytagid(tag_id: ID!): [Blog]
    blogsbytagurl(tag_url: String!): [Blog]
  }

  extend type Mutation {
    addBlog(
      title: String
      content: String
      status: String
      blog_tag: customArray
      url: String
      feature_image: Upload
      meta: customObject
    ): MessageSchema
    updateBlog(
      id: ID!
      title: String
      content: String
      status: String
      blog_tag: customArray
      url: String
      updatedImage: Upload
      meta: customObject
    ): MessageSchema
    deleteBlog(id: ID!): MessageSchema
    addBlogTag(name: String, url: String): MessageSchema
    updateBlogTag(id: ID!, name: String, url: String): MessageSchema
    deleteBlogTag(id: ID!): MessageSchema
  }
`;
