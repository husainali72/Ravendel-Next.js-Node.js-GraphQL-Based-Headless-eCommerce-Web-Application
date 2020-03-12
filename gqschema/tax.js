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

  extend type Query {
    tax: Tax
  }

  extend type Mutation {
    updateGlobalTax(global: customObject): Tax
    updateOptionTax(is_inclusive: Boolean): Tax
    addTaxClass(tax_class: customObject): Tax
    updateTaxClass(tax_class: customObject): Tax
    deleteTaxClass(_id: String): Tax
  }
`;
