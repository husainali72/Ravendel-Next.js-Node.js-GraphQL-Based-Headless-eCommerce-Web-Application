import gql from "graphql-tag";
const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      content
      status
      feature_image
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
  ) {
    addBlog(
      title: $title
      content: $content
      status: $status
      feature_image: $feature_image
    ) {
      id
      title
      content
      status
      feature_image
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
  ) {
    updateBlog(
      id: $id
      title: $title
      content: $content
      status: $status
      updatedImage: $updatedImage
    ) {
      id
      title
      content
      status
      feature_image
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
      date
    }
  }
`;

export { GET_BLOGS, GET_BLOG, ADD_BLOG, UPDATE_BLOG, DELETE_BLOG };
