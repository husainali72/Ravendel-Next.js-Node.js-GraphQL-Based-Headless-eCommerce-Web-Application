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

  type brandResponse {
    data: [Brand]
    pagination: paginationInfo
    message: statusSchema
  }

  extend type Query {
    brands_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): brandResponse
    brands: [Brand]
    brand(id: ID!): Brand
  }
  extend type Mutation {
    addBrand(brands: [BrandField]): statusSchema
    updateBrand(
      id: ID!
      name: String
      url: String
      updated_brand_logo: Upload
      meta: customObject
    ): statusSchema
    deleteBrand(id: ID!): statusSchema
  }
`;
