// const { gql } = require("@apollo/server");
module.exports = `
  type Zipcode {
    id: ID
    zipcode: String
  }

  type checkZipcode {
    message: String
    success: Boolean
  } 

  type ZIPCODE_BY_ID_RESPONSE {
    data: Zipcode
    message: statusSchema
  }

  extend type Query {
    checkZipcode( zipcode: String! ): checkZipcode
    zipcode( id: ID! ): ZIPCODE_BY_ID_RESPONSE
  }

  extend type Mutation {
    addZipcode( zipcode: String! ): statusSchema
    updateZipcode(
      id: ID!
      zipcode: String!
    ): statusSchema
    deleteZipcode( id: ID! ): statusSchema
  }
`;