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
  
  type productAttributeResponse {
    data: [productAttribute]
    pagination: paginationInfo
    message: statusSchema
  }
  type productAttributeIdRES {
    data: productAttribute
    message: statusSchema
  }
  type productAttributeRES {
    data: [productAttribute]
    message: statusSchema
  }
  extend type Query {
    productAttribute_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): productAttributeResponse
    productAttributes: productAttributeRES
    productAttribute(id: ID!): productAttributeIdRES
  }

  extend type Mutation {
    addAttribute(attribute: AttributeInput): statusSchema
    updateAttribute(attribute: AttributeInput): statusSchema
    deleteAttribute(id: ID!): statusSchema
  }
`;
