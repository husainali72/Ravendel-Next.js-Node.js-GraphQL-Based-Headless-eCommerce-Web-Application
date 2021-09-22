const { gql } = require("apollo-server-express");
module.exports = gql`
  type User {
    id: ID
    email: String
    name: String
    role: String
    password: String
    image: customObject
    meta: userMeta
    date: Date
    updated: Date
  }

  type userMeta {
    meta(key: String, value: String): metaKeyValueArray
  }
  type response {
    totalCount: Int
    page: Int
  }
  type UserResponse {
    data: [User]
    pagination: response
  }
  extend type Query {
    users: [User]
    users_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): UserResponse
    user(id: ID!): User
    usersbyMeta(key: String, value: String): [User]
  }

  extend type Mutation {
    addUser(
      name: String
      email: String
      role: String
      password: String
      image: Upload
    ): [User]
    updateUser(
      id: ID!
      name: String
      email: String
      role: String
      password: String
      updatedImage: Upload
      meta: [Meta]
    ): [User]
    deleteUser(id: ID!): [User]
  }
`;
