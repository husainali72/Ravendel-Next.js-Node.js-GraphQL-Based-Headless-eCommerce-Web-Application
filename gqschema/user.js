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

  extend type Query {
    users: [User]
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
