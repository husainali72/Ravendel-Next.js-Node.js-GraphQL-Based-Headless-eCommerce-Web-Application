import gql from "graphql-tag";
const GET_USERS = gql`
  {
    books {
      id
      name
    }
  }
`;

export { GET_USERS };
