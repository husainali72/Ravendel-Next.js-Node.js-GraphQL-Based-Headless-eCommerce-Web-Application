// const { gql } = require("@apollo/server");
module.exports = `
  type Blog {
    id: ID
    title: String
    content: String
    status: String
    blog_tag: customArray
    url: String
    feature_image: String
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
  type BLOG_PAGINATION_RESPONSE {
    data: [Blog]
    pagination: paginationInfo
    message: statusSchema
  }
  type TAG_PAGINATION_RESPONSE {
    data: [BlogTag]
    pagination: paginationInfo
    message: statusSchema
  }
  type Blog_response {
    data: [Blog]
    message: statusSchema
  }
  type BLOG_BY_ID_RESPONSE {
    data: Blog
    message: statusSchema
  }
  type BLOG_TEG_RESPONSE {
    data: [BlogTag]
    message: statusSchema
  }
  type BLOGS_BY_TAG_RESPONSE {
    data: Blog
    message: statusSchema
  }
  type BLOG_BY_TAG_URL_RESPONSE {
    data: [Blog]
    message: statusSchema
  }
  extend type Query {
    blogs: Blog_response
    blog_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): BLOG_PAGINATION_RESPONSE
    blog(id: ID!): BLOG_BY_ID_RESPONSE
    blogtags: BLOG_TEG_RESPONSE
    blogTags_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): TAG_PAGINATION_RESPONSE
    blogsbytagid(tag_id: ID!): BLOGS_BY_TAG_RESPONSE
    blogsbytagurl(tag_url: String!): BLOG_BY_TAG_URL_RESPONSE
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
    ): statusSchema
    updateBlog(
      id: ID!
      title: String
      content: String
      status: String
      blog_tag: customArray
      url: String
      updatedImage: Upload
      meta: customObject
    ): statusSchema
    deleteBlog(id: ID!): statusSchema
    addBlogTag(name: String, url: String): statusSchema
    updateBlogTag(id: ID!, name: String, url: String): statusSchema
    deleteBlogTag(id: ID!): statusSchema
  }
`;
