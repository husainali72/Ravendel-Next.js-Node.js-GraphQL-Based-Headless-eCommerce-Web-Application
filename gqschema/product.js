const { gql } = require("apollo-server-express");
module.exports = gql`
  type productCategory {
    id: ID
    name: String
    parentId: ID
    child: metaKeyValueArray
    ancestors: metaKeyValueArray
    date: Date
    updated: Date
  }

  type Product {
    id: ID
    name: String
    categoryId: metaKeyValueArray
    sku: String
    description: String
    shippingDetails: customObject
    manufactureDetails: customObject
    quantity: Int
    pricing: customObject
    slug: String
    meta: productMeta
    status: String
    date: Date
    updated: Date
  }

  type productMeta {
    meta(key: String, value: String): metaKeyValueArray
  }

  extend type Query {
    productCategories: [productCategory]
    productCategory(id: ID!): productCategory
    getTree: [productCategory]
    products: [Product]
    product(id: ID!): Product
  }
  extend type Mutation {
    addProductCategory(name: String, parentId: ID): productCategory
    updateProductCategory(id: ID!, name: String, parentId: ID): productCategory
    deleteProductCategory(id: ID!): Boolean!
    addTree(name: String, parentname: String): productCategory
    addProduct(
      name: String
      categoryId: metaKeyValueArray
      sku: String
      description: String
      quantity: Int
      pricing: customObject
    ): Product
    updateProduct(
      id: ID
      name: String
      categoryId: metaKeyValueArray
      sku: String
      description: String
      quantity: Int
      pricing: customObject
    ): Product
    deleteProduct(id: ID!): Boolean!
  }
`;
