import gql from "graphql-tag";
const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      url
      content
      status
      blog_tag
      feature_image
      meta
      date
      updated
    }
  }
`;

const GET_BLOG = gql`
  query($id: ID!) {
    blog(id: $id) {
      id
      title
      url
      content
      status
      blog_tag
      feature_image
      meta
      date
      updated
    }
  }
`;

const ADD_BLOG = gql`
  mutation(
    $title: String
    $content: String
    $status: String
    $blog_tag: customArray
    $feature_image: Upload
    $meta: customObject
  ) {
    addBlog(
      title: $title
      content: $content
      status: $status
      blog_tag: $blog_tag
      feature_image: $feature_image
      meta: $meta
    ) {
      id
      title
      url
      content
      status
      blog_tag
      feature_image
      meta
      date
      updated
    }
  }
`;

const UPDATE_BLOG = gql`
  mutation(
    $id: ID!
    $title: String
    $content: String
    $status: String
    $blog_tag: customArray
    $updatedImage: Upload
    $meta: customObject
  ) {
    updateBlog(
      id: $id
      title: $title
      content: $content
      status: $status
      blog_tag: $blog_tag
      updatedImage: $updatedImage
      meta: $meta
    ) {
      id
      title
      url
      content
      status
      blog_tag
      feature_image
      meta
      date
      updated
    }
  }
`;

const DELETE_BLOG = gql`
  mutation($id: ID!) {
    deleteBlog(id: $id) {
      id
      title
      url
      content
      status
      blog_tag
      feature_image
      meta
      date
      updated
    }
  }
`;

const GET_BLOGTAGS = gql`
  {
    blogtags {
      id
      name
      url
      date
      updated
    }
  }
`;

const ADD_BLOGTAG = gql`
  mutation($name: String, $url: String) {
    addBlogTag(name: $name, url: $url) {
      id
      name
      url
      date
      updated
    }
  }
`;

const UPDATE_BLOGTAG = gql`
  mutation($id: ID!, $name: String, $url: String) {
    updateBlogTag(id: $id, name: $name, url: $url) {
      id
      name
      url
      date
      updated
    }
  }
`;

const DELETE_BLOGTAG = gql`
  mutation($id: ID!) {
    deleteBlogTag(id: $id) {
      id
      name
      url
      date
      updated
    }
  }
`;

export {
  GET_BLOGS,
  GET_BLOG,
  ADD_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  GET_BLOGTAGS,
  ADD_BLOGTAG,
  UPDATE_BLOGTAG,
  DELETE_BLOGTAG,
};
