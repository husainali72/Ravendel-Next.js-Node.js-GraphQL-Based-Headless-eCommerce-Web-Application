const { gql } = require("apollo-server-express");

module.exports = gql`
  

  type productAttribute {
    _id: ID
    name: String
    slug: String
    values: [customObject]
    attribute_values: [customObject]
    date: Date
    updated: Date
  }

  type AttrResult {
    product_attributes: [productAttribute]
    currentPage: Int
    totalPages: Int
    totalCount:Int
  }

  type attributeValues {
    id: ID
    name: String
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


  extend type Query {
    product_attributes(search: String, page: Int, limit: Int): AttrResult
    product_attribute(id: ID!): productAttribute
  }

  extend type Mutation {
    addAttribute(attribute: AttributeInput): attributeResponse
    updateAttribute(attribute: AttributeInput): attributeResponse
    deleteAttribute(id: ID!): attributeResponse
  }
`;
