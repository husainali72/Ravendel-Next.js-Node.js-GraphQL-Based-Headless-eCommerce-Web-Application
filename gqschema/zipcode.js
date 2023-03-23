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
    checkZipcode( zipcode: String ): checkZipcode
    getZipcode( id: ID ): Zipcode
  }

  extend type Mutation {
    addZipcode( zipcode: String ): Zipcode
    updateZipcode(
      id: ID
      zipcode: String
    ): Zipcode
    deleteZipcode( id: ID ): Zipcode
  }
`;