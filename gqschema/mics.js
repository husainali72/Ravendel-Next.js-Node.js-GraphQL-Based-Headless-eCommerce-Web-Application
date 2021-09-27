const { gql } = require("apollo-server-express");

module.exports = gql`
  type statusSchema {
    message: String
    status: Int
  }
  type paginationInfo {
    totalCount: Int
    page: Int
  }
  extend type Query {
    pagination: paginationInfo
    message: statusSchema
  }
`;
