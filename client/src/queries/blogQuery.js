import gql from "graphql-tag";
const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      content
      status
      feature_image
      meta
      date
    }
  }
`;

const GET_BLOG = gql`
  query($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      status
      feature_image
      meta
      date
    }
  }
`;

const ADD_BLOG = gql`
  mutation(
    $title: String
    $content: String
    $status: String
    $feature_image: Upload
    $meta: customObject
  ) {
    addBlog(
      title: $title
      content: $content
      status: $status
      feature_image: $feature_image
      meta: $meta
    ) {
      id
      title
      content
      status
      feature_image
      meta
      date
    }
  }
`;

const UPDATE_BLOG = gql`
  mutation(
    $id: ID!
    $title: String
    $content: String
    $status: String
    $updatedImage: Upload
    $meta: customObject
  ) {
    updateBlog(
      id: $id
      title: $title
      content: $content
      status: $status
      updatedImage: $updatedImage
      meta: $meta
    ) {
      id
      title
      content
      status
      feature_image
      meta
      date
    }
  }
`;

const DELETE_BLOG = gql`
  mutation($id: ID!) {
    deleteBlog(id: $id) {
      id
      title
      content
      status
      feature_image
      meta
      date
    }
  }
`;

export { GET_BLOGS, GET_BLOG, ADD_BLOG, UPDATE_BLOG, DELETE_BLOG };
