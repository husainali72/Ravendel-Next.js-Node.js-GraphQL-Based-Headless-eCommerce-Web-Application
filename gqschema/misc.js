// const { gql } = require("@apollo/server"); 

module.exports = `
  type statusSchema {
    message: String
    success: Boolean
  }
  type statusDataSchema {
    message: String
    success: Boolean
    data: customArray!
  }
  type dashboardDataRES {
    productCount: Int
    userCount: Int
    customerCount: Int
    latestProducts: customArray 
    latestOrders: customArray 
    ordersByYearMonth: customArray 
    totalSales: Float
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
