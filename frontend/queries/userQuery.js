import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query{
    users {
    data {
        id
        name
        email
        role
        image
      }
      message {
        message
        success
      }
    }
  }
`;

export const ADD_USER = gql`
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
      message
      success
    }
  }
`;