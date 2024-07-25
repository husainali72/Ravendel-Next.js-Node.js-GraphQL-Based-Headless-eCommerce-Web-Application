// const { gql } = require("@apollo/server");
module.exports = `
   
  enum DEVICE_TYPE {
    ANDROID
    IOS
  }

  type DEVICE_INFO {
    device_id: String
    device_type: DEVICE_TYPE
    app_version: String
  }
  
  input DEVICE_INFO_INPUT {
    device_id: String
    device_type: DEVICE_TYPE
    app_version: String
  }

  type User {
    id: ID
    email: String
    name: String
    role: String
    password: String
    image: String
    meta: userMeta
    date: Date
    device_info: DEVICE_INFO
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
    updateUserDeviceInfo(
      device_info: DEVICE_INFO_INPUT
    ): statusSchema
  }
`;
