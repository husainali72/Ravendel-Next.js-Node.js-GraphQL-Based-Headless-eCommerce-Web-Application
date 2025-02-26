module.exports = `
  type Group {
    id: ID
    title: String
    attributes: [Attribute]
    variations: [Variation]
    productIds: [ID]
    status: String
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
    productUrl: String
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
    productUrl: String
  }
  input CombinationInput {
    attributeId: ID,
    attributeValueId: ID,
  }
  
  
  extend type Query {
    groups: GroupsResponse
    group(id: ID!): GroupResponse
    availableProducts(groupId: ID): customArray
  }
  extend type Mutation {
    addGroup(
      title: String!
      status: String
      attributes: [AttributeInput]
      variations: [VariationInput]
      productIds: [ID]
    ): statusSchema
    updateGroup(
      id: ID!
      title: String!
      status: String
      attributes: [AttributeInput]
      variations: [VariationInput]
      productIds: [ID]
    ): statusSchema
    deleteGroup(id: ID!): statusSchema
  }
`;
