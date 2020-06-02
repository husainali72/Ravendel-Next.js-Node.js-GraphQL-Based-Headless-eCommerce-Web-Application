import gql from "graphql-tag";
const GET_PAGES = gql`
  {
    pages {
      id
      title
      content
      status
      url
      meta
      createdAt
      updatedAt
    }
  }
`;

const GET_PAGE = gql`
  query($id: ID!) {
    page(id: $id) {
      id
      title
      content
      status
      url
      meta
      createdAt
      updatedAt
    }
  }
`;

const ADD_PAGE = gql`
  mutation(
    $title: String
    $content: String
    $status: String
    $url: String
    $meta: customObject
  ) {
    addPage(
      title: $title
      content: $content
      status: $status
      url: $url
      meta: $meta
    ) {
      id
      title
      content
      status
      url
      meta
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_PAGE = gql`
  mutation(
    $id: ID!
    $title: String
    $content: String
    $status: String
    $url: String
    $meta: customObject
  ) {
    updatePage(
      id: $id
      title: $title
      content: $content
      status: $status
      url: $url
      meta: $meta
    ) {
      id
      title
      content
      status
      url
      meta
      createdAt
      updatedAt
    }
  }
`;

const DELETE_PAGE = gql`
  mutation($id: ID!) {
    deletePage(id: $id) {
      id
      title
      content
      status
      url
      meta
      createdAt
      updatedAt
    }
  }
`;

export { GET_PAGES, GET_PAGE, ADD_PAGE, UPDATE_PAGE, DELETE_PAGE };
