import gql from "graphql-tag";
const GET_USERS = gql`
  {
    users {
      id
      name
    }
  }
`;

const GET_USER = gql`
  query getbook($id: ID!) {
    user(id: $id) {
      id
      name
    }
  }
`;

export { GET_USERS, GET_USER };
