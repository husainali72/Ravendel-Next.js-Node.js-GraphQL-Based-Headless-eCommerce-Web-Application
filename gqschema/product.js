const { gql } = require("apollo-server-express");

/* type cattree {
  _id: String
  tree: metaKeyValueArray
  parent: String
  child: metaKeyValueArray
} */

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

  type cattree {
    _id: ID
    name: String
    parentId: ID
    children: customArray
  }

  type Product {
    id: ID
    name: String
    categoryId: customArray
    sku: String
    description: String
    shippingDetails: customObject
    manufactureDetails: customObject
    quantity: String
    pricing: customObject
    slug: String
    feature_image: customObject
    gallery_image: customObject
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
    getTree: [cattree]
    products: [Product]
    product(id: ID!): Product
  }
  extend type Mutation {
    addProductCategory(name: String, parentId: ID): [productCategory]
    updateProductCategory(
      id: ID!
      name: String
      parentId: ID
    ): [productCategory]
    deleteProductCategory(id: ID!): [productCategory]
    addTree(name: String, parentname: String): productCategory
    addProduct(
      name: String
      categoryId: customArray
      slug: String
      description: String
      sku: String
      quantity: String
      pricing: customObject
      feature_image: Upload
      gallery_image: Upload
      status: String
    ): [Product]
    updateProduct(
      id: ID
      name: String
      categoryId: customArray
      slug: String
      description: String
      sku: String
      quantity: String
      pricing: customObject
      feature_image: Upload
      gallery_image: Upload
      status: String
    ): [Product]
    deleteProduct(id: ID!): [Product]
  }
`;
