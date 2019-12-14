import gql from "graphql-tag";
const GET_USERS = gql`
  {
    users {
      id
      name
      email
      role
    }
  }
`;

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`;

const ADD_USER = gql`
  mutation($name: String, $email: String, $password: String, $role: String) {
    addUser(name: $name, email: $email, password: $password, role: $role) {
      name
      email
      role
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation(
    $id: ID!
    $name: String
    $email: String
    $password: String
    $role: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      password: $password
      role: $role
    ) {
      name
      email
      role
      id
    }
  }
`;

const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      name
      email
      role
      id
    }
  }
`;

export { GET_USERS, GET_USER, ADD_USER, UPDATE_USER, DELETE_USER };
