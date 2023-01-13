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
 
  type UserResponse {
    data: [User],
    pagination: paginationInfo
    message: statusSchema
  }
  
  type UserIdRES {
    data: User
    message: statusSchema
  }
  type UserRES {
    data:  [User]
    message: statusSchema
  }
  extend type Query {
    users: UserRES
    users_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): UserResponse
    user(id: ID!): UserIdRES
    usersbyMeta(key: String, value: String): [User]
    dashboardData: dashboardDataRES
  }

  extend type Mutation {
    addUser(
      name: String
      email: String
      role: String
      password: String
      image: Upload
    ): statusSchema
    updateUser(
      id: ID!
      name: String
      email: String
      role: String
      password: String
      updatedImage: Upload
      meta: [Meta]
    ): statusSchema
    deleteUser(id: ID!): statusSchema
  }
`;
