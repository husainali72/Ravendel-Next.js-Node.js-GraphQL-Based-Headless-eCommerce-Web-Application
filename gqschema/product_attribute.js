const { gql } = require("apollo-server-express");

module.exports = gql`
  type attributeValues {
    id: ID
    name: String
  }

  type productAttribute {
    id: ID
    name: String
    slug: String
    values: [customObject]
    attribute_values: [customObject]
    date: Date
    updated: Date
  }

  type attributeResponse {
    id: ID
    success: Boolean
    message: String
  }

  input AttributeValuesInput {
    id: ID
    name: String
  }

  input AttributeInput {
    id: ID
    name: String
    values: [customObject]
  }

  type AResult {
    product_attributes: [productAttribute]
    currentPage: Int
    totalPages: Int
    totalCount:Int
  }

  extend type Query {
    
    product_attributes(search: String, page: Int, limit: Int): AResult
    product_attribute(id: ID!): productAttribute
  }

  extend type Mutation {
    addAttribute(attribute: AttributeInput): attributeResponse
    updateAttribute(attribute: AttributeInput): attributeResponse
    deleteAttribute(id: ID!): attributeResponse
  }
`;
