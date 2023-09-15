const { gql } = require("apollo-server-express");
module.exports = gql`
  type Tax {
    id: ID
    is_inclusive: Boolean
    global: customObject
    taxClass: [customObject]
    date: Date
    updated: Date
  }
type response{
  data:Tax
  message:statusSchema
}
  extend type Query {
    tax: response
  }

  extend type Mutation {
    updateGlobalTax(global: customObject): statusSchema
    updateOptionTax(is_inclusive: Boolean): statusSchema
    addTaxClass(taxClass: customObject): statusSchema
    updateTaxClass(taxClass: customObject): statusSchema
    deleteTaxClass(_id: String): statusSchema
  }
`;
