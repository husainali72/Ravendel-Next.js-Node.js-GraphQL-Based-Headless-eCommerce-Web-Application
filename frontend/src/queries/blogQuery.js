import gql from "graphql-tag";
//test2
// const GET_BLOGS = gql`
//   {
//     blogs {
//       id
//       title
//       content
//       status
//       feature_image
//       date
//     }
//   }
// `;
const GET_BLOGS = gql`
  {
    blogs {
      data {
        id
        title
        content
        status
        feature_image
        date
      }
      message {
        message
        success
      }
    }
  }
`;

// const GET_BLOG = gql`
//   query($id: ID!) {
//     blog(id: $id) {
//       id
//       title
//       content
//       status
//       feature_image
//       date
//     }
//   }
// `;
const GET_BLOG = gql`
  query ($id: ID!) {
    blog(id: $id) {
      data {
        id
        title
        content
        status
        feature_image
        date
      }
      message {
        message
        success
      }
    }
  }
`;

// const GET_BLOGTAGS = gql`
//   {
//     blogtags {
//       id
//       name
//       url
//       date
//       updated
//     }
//   }
// `;
// const GET_BLOGTAGS = gql`
//   {
//     blogtags {
//       id
//       name
//       url
//       date
//       updated
//     }
//   }
// `;
const GET_BLOGTAGS = gql`
  {
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

// const GET_TAG_BLOGS = gql`
//   query ($url: String!) {
//     blogsbytagurl(tag_url: $url) {
//       id
//       title
//       content
//       status
//       feature_image
//       date
//     }
//   }
// `;
const GET_TAG_BLOGS = gql`
  query ($url: String!) {
    blogsbytagurl(tag_url: $url) {
      data {
        id
        title
        content
        status
        feature_image
        date
      }
      message {
        message
        success
      }
    }
  }
`;

export { GET_BLOGS, GET_BLOG, GET_BLOGTAGS, GET_TAG_BLOGS };
