const { gql } = require("apollo-server-express");

module.exports = gql`
  type statusSchema {
    message: String
    success: Boolean
  }
  type dashboardDataRES {
    productCount: Int
    userCount: Int
    customerCount: Int
    latestProducts: customArray 
    latestOrders: customArray 
    ordersByYearMonth: customArray 
    totalSales: Int
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
