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

  type blogResponse {
    data: [Blog]
    pagination: paginationInfo
    message: statusSchema
  }

  type blogTagsRes {
    data: [BlogTag]
    pagination: paginationInfo
    message: statusSchema
  }
  type response{
  data:[Blog]
    message: statusSchema
  }
  type blogRES{
    data:Blog
    message: statusSchema
  }
  type blogtagRES{
    data:[BlogTag]
    message: statusSchema
  }
  extend type Query {
    blogs: response
    blog_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): blogResponse
    blog(id: ID!): blogRES
    blogtags: blogtagRES
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
    ):statusSchema 
    updateBlog(
      id: ID!
      title: String
      content: String
      status: String
      blog_tag: customArray
      url: String
      updatedImage: Upload
      meta: customObject
    ):statusSchema
    deleteBlog(id: ID!):statusSchema
    addBlogTag(name: String, url: String):statusSchema
    updateBlogTag(id: ID!, name: String, url: String):statusSchema
    deleteBlogTag(id: ID!):statusSchema
  }
`;
