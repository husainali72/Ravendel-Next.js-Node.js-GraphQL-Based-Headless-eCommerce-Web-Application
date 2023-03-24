const { gql } = require("apollo-server-express");
module.exports = gql`
  type Zipcode {
    id: ID
    zipcode: String
  }

  type checkZipcode {
    message: String
    success: Boolean
  } 

  extend type Query {
    checkZipcode( zipcode: String! ): checkZipcode
    zipcode( id: ID! ): Zipcode
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