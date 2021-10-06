const { gql } = require("apollo-server-express");
module.exports = gql`
  type Tax {
    id: ID
    is_inclusive: Boolean
    global: customObject
    tax_class: [customObject]
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
    addTaxClass(tax_class: customObject): statusSchema
    updateTaxClass(tax_class: customObject): statusSchema
    deleteTaxClass(_id: String): statusSchema
  }
`;
