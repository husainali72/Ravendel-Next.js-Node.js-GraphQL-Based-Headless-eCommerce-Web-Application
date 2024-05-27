module.exports = `
  extend type Query {
    events: customArray
  }
  extend type Mutation {
    addLog(
      IP: String!
      customerId: ID
      event: String!
      from: String
      data: customObject
    ): statusSchema
  }
`;
