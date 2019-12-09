const { gql } = require("apollo-server-express");
module.exports = gql`
  type User {
    email: String
    name: String
    role: String
    id: ID
    password: String
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
    addUser(name: String, email: String, role: String, password: String): User
    updateUser(
      id: ID!
      name: String
      email: String
      role: String
      password: String
      meta: [Meta]
    ): User
    deleteUser(id: ID!): Boolean!
  }
`;
