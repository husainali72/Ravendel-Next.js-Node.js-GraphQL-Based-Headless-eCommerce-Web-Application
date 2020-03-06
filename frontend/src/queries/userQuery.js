import gql from "graphql-tag";
const GET_USERS = gql`
  {
    users {
      id
      name
      email
      role
      image
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
  mutation(
    $name: String
    $email: String
    $password: String
    $role: String
    $image: Upload
  ) {
    addUser(
      name: $name
      email: $email
      password: $password
      role: $role
      image: $image
    ) {
      name
      email
      role
      id
      image
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
    $updatedImage: Upload
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      password: $password
      role: $role
      updatedImage: $updatedImage
    ) {
      name
      email
      role
      id
      image
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
      image
    }
  }
`;

export { GET_USERS, GET_USER, ADD_USER, UPDATE_USER, DELETE_USER };
