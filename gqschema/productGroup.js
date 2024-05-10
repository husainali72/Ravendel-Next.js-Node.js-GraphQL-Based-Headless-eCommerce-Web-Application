module.exports = `
  type Group {
    id: ID
    title: String
    attributes: [Attribute]
    variations: [Variation]
    productIds: [ID]
    updatedAt: Date
    createdAt: Date
  }

  type Attribute {
    _id: ID,
    values: [ID]
  }

  type Variation {
    _id: ID,
    combinations: [Combination]
    productId: ID
  }
  type Combination {
    attributeId: ID,
    attributeValueId: ID,
  }

  type GroupResponse {
    data: Group
    message: statusSchema
  }
  type GroupsResponse {
    data: [Group]
    message: statusSchema
  }

  input AttributeInput {
    _id: ID,
    value: String
  }

  input VariationInput {
    _id: ID,
    combinations: [CombinationInput]
    productId: ID
  }
  input CombinationInput {
    attributeId: ID,
    attributeValueId: ID,
  }
  
  
  extend type Query {
    groups: GroupsResponse
    group(id: ID!): GroupResponse
  }
  extend type Mutation {
    addGroup(
      title: String!
      attributes: [AttributeInput]
      variations: [VariationInput]
      productIds: [ID]
    ): statusSchema
    updateGroup(
      id: ID!
      title: String!
      attributes: [AttributeInput]
      variations: [VariationInput]
      productIds: [ID]
    ): statusSchema
    deleteGroup(id: ID!): statusSchema
  }
`;
