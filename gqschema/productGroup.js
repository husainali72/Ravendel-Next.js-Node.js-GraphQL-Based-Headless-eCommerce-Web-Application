module.exports = `
  type Group {
    id: ID
    title: String
    attributes: [Attribute]
    variations: [Variation]
    productIDs: [ID]
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
    productID: ID
  }
  type Combination {
    attributeID: ID,
    attributeValue: ID,
  }

  type GroupResponse {
    data: Group
    message: statusSchema
  }
  type GroupsResponse {
    data: [Group]
    message: statusSchema
  }

  extend type Query {
    groups: GroupsResponse
    group(id: ID!): GroupResponse 
  }

  input AttributeInput {
    _id: ID,
    value: String
  }

  input VariationInput {
    _id: ID,
    combinations: [CombinationInput]
    productID: ID
  }
  input CombinationInput {
    attributeID: ID,
    attributeValue: ID,
  }
  
  extend type Mutation {
    addGroup(
      title: String!
      attributes: [AttributeInput]
      variations: [VariationInput]
      productIDs: [ID]
    ): statusSchema
    updateGroup(
      id: ID!
      title: String!
      attributes: [AttributeInput]
      variations: [VariationInput]
      productIDs: [ID]
    ): statusSchema
    deleteGroup(id: ID!): statusSchema
  }
`;
