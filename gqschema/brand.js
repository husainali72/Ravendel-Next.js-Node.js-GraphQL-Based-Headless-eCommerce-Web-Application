const { gql } = require("apollo-server-express");
module.exports = gql`
  type Brand {
    id: ID
    name: String
    url: String
    brand_logo: customObject
    meta: BrandMeta
    date: Date
    updated: Date
  }

  type BrandMeta {
    title: String
    description: String
    keywords: String
  }

  input BrandMetaInput {
    title: String
    description: String
    keywords: String
  }

  input BrandField {
    name: String
  }

  extend type Query {
    brands: [Brand]
    brand(id: ID!): Brand
  }
  extend type Mutation {
    addBrand(brands: [BrandField]): [Brand]
    updateBrand(
      id: ID!
      name: String
      url: String
      updated_brand_logo: Upload
      meta: customObject
    ): [Brand]
    deleteBrand(id: ID!): [Brand]
  }
`;
