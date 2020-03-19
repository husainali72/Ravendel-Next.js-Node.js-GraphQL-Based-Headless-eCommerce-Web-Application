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
    url: String
    sku: String
    description: String
    shippingDetails: customObject
    manufactureDetails: customObject
    quantity: String
    pricing: customObject
    feature_image: customObject
    gallery_image: customObject
    meta: customObject
    shipping: customObject
    tax_class: String
    status: String
    featured_product: Boolean
    product_type: customObject
    custom_field: [customObject]
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
      url: String
      description: String
      sku: String
      quantity: String
      pricing: customObject
      feature_image: Upload
      gallery_image: Upload
      shipping: customObject
      tax_class: String
      status: String
      featured_product: Boolean
      product_type: customObject
      meta: customObject
      custom_field: [customObject]
    ): [Product]
    updateProduct(
      id: ID
      name: String
      categoryId: customArray
      url: String
      description: String
      sku: String
      quantity: String
      pricing: customObject
      update_feature_image: Upload
      update_gallery_image: Upload
      removed_image: customArray
      shipping: customObject
      tax_class: String
      status: String
      featured_product: Boolean
      product_type: customObject
      meta: customObject
      custom_field: [customObject]
    ): [Product]
    deleteProduct(id: ID!): [Product]
  }
`;
