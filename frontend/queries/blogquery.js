import { gql } from "@apollo/client";

export const GET_BLOGS_QUERY = gql`
 query {

blogs {
      data {
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
      message {
        message
        success
      }
    } 
  }
`;
export const GET_BLOG_BY_ID_QUERY = gql`
query ($id: ID!) {
  blog(id: $id) {
    data {
      id
      title
      content
      status
      feature_image
      date
      __typename
    }
    message {
      message
      success
      __typename
    }
    __typename
  }
}
`;

export const GET_BLOGTAGS_QUERY = gql`
  query {
    blogtags {
      data {
          id
          name
          url
          date
          updated
      }
      message {
        message
        success
      }
    }
  }
`;

export const GETBLOG_BY_ID_QUERY = gql`
query ($url: String!) {
  blogsbytagurl(tag_url: $url) {
    data {
      id
      title
      content
      status
      feature_image
      date
      __typename
    }
    message {
      message
      success
      __typename
    }
    __typename
  }
}

`;