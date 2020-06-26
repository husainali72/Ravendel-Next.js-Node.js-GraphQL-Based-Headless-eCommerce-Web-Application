const { gql } = require("apollo-server-express");

module.exports = gql`
  type productCategory {
    id: ID
    name: String
    parentId: ID
    url: String
    description: String
    image: customObject
    meta: customObject
    date: Date
    updated: Date
  }

  type productBrand {
    id: ID
    name: String
    url: String
    brand_logo: customObject
    meta: customObject
    date: Date
    updated: Date
  }

  type cattree {
    _id: ID
    name: String
    parentId: ID
    children: customArray
  }

  type CatwithProducts {
    id: ID
    name: String
    parentId: ID
    url: String
    description: String
    image: customObject
    meta: customObject
    date: Date
    updated: Date
    products: [ProductWithCat]
  }

  type ProductWithCat {
    id: ID
    name: String
    categoryId: [productCategory]
    brand: productBrand
    url: String
    sku: String
    short_description: String
    description: String
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

  type Product {
    id: ID
    name: String
    categoryId: customArray
    brand: productBrand
    url: String
    sku: String
    short_description: String
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
    productswithcat: [ProductWithCat]
    featureproducts: [ProductWithCat]
    product(id: ID!): Product
    productsbycatid(cat_id: ID!): [ProductWithCat]
    productsbycaturl(cat_url: String!): CatwithProducts
  }

  extend type Mutation {
    addProductCategory(
      name: String
      parentId: ID
      url: String
      description: String
      image: Upload
      meta: customObject
    ): [productCategory]
    updateProductCategory(
      id: ID!
      name: String
      parentId: ID
      url: String
      description: String
      update_image: Upload
      meta: customObject
    ): [productCategory]
    deleteProductCategory(id: ID!): [productCategory]
    addTree(name: String, parentname: String): productCategory
    addProduct(
      name: String
      categoryId: customArray
      brand: ID
      url: String
      short_description: String
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
      brand: ID
      url: String
      short_description: String
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
