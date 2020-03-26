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

const GET_TAG_BLOGS = gql`
  query($url: String!) {
    blogsbytagurl(tag_url: $url) {
      id
      title
      content
      status
      feature_image
      date
    }
  }
`;

export { GET_BLOGS, GET_BLOG, GET_BLOGTAGS, GET_TAG_BLOGS };
