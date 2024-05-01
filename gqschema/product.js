// const { gql } = require("@apollo/server");

module.exports = `
  type FILTER_BRAND {
    brandMaster: BRAND_MASTER
  }

  type BRAND_MASTER {
    _id: ID
    name: String
  }

  type GROUP_ATTRBUTE {
    attribute_id: ID
    attribute_value_id: ID
  }

  type ATTRIBUTE_MASTER {
    _id: ID
    name: String
    values: [customObject]
  }

  type FILTER_ATTRIBUTE {
    _id: GROUP_ATTRBUTE
    attributeMaster: ATTRIBUTE_MASTER
  }

  type ChildCat {
    id: ID
    name: String
    parentId: ID
    url: String
  }

  type productCategory {
    id: ID
    name: String
    parentId: ID
    url: String
    description: String
    image: String
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

  type Category {
    id: ID
    name: String
    parentId: ID
    url: String
    description: String
    image: String
    products: [Product]
    child_cat: [ChildCat]
    filter_attributes: [FILTER_ATTRIBUTE]
    filter_brands: [FILTER_BRAND]
    meta: customObject
    date: Date
    updated: Date
  }

  type ProductVariations {
    id: ID
    productId: ID
    combination: customArray
    pricing: customObject
    quantity: Float
    sku: String
    image: String
    createdAt: Date
    updatedAt: Date
  }

  type productSpecification {
    key: String
    attributeId: ID
    value: String
    attributeValueId: ID
    group: String
  }

  input productSpecificationInput {
    key: String
    attributeId: ID
    value: String
    attributeValueId: ID
    group: String
  }

  type Product {
    _id: ID
    name: String
    categoryId: [productCategory]
    categoryTree: customArray
    brand: productBrand
    url: String
    sku: String
    short_description: String
    description: String
    quantity: String
    pricing: customObject
    feature_image: String
    gallery_image: customArray
    meta: customObject
    shipping: customObject
    taxClass: String
    status: String
    featured_product: Boolean
    product_type: customObject
    custom_field: [customObject]
    specifications: [productSpecification]
    attributes: customArray
    variations: customArray
    date: Date
    rating: Float
    ratingCount: Int
    levelWiseRating: customObject
    updated: Date
  }

  type productMeta {
    meta(key: String, value: String): metaKeyValueArray
  }

  type ProductResponse {
    data: [Product]
    pagination: paginationInfo
    message: statusSchema
  }

  type CategoriesResponse {
    data: [productCategory]
    pagination: paginationInfo
    message: statusSchema
  }
  type productCategoriesRES {
    data: [productCategory]
    message: statusSchema
  }
  type productCate_by_Id_RES {
    data: productCategory
    message: statusSchema
  }
  type productsRES {
    data: [Product]
    message: statusSchema
  }
  type products_with_cat_RES {
    data: [Product]
    message: statusSchema
  }
  type productCate_by_url {
    data:Category
    message: statusSchema
  }
  type products_by_url {
    data:Product
    message: statusSchema
  }
  type products_by_id {
    data:Product
    message: statusSchema
  }

  type entryUrl {
    url: String
  }

  type products_v1 {
    message: String
    success: Boolean
    data: [customObject]
  } 

  input getProductsRequest {
    mainFilter: customObject
    filters: customArray
  }
  type getProductsResponse {
    message: String
    success: Boolean
    category: customObject
    filterData: customArray,
    productData: customObject
  }

  extend type Query {
    getProducts(
      mainFilter: customObject
      filters: customArray
      sort: customObject
      pageNo: Int
      limit: Int
    ): getProductsResponse
    productCategories: productCategoriesRES
    productCategories_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): ProductResponse
    productCategoriesByFilter(filter: customObject): [Category]
    productCategory(id: ID!): productCate_by_Id_RES
    getTree: [cattree]
    products(admin: Boolean): productsRES
    products_pagination(
      limit: Int
      pageNumber: Int
      search: String
      orderBy: String
      order: String
    ): CategoriesResponse
    searchProducts(
      searchTerm: String!
      page: Int!,
      limit: Int!
    ): [Product]
    productswithcat: products_with_cat_RES
    featureproducts: [Product]
    recentproducts: [Product]
    product(id: ID!): products_by_id
    productsbycatid(cat_id: ID!): [Product]
    productsbycaturl(cat_url: String!): productCate_by_url
    productbyurl(url: String):  products_by_url
    filteredProducts(filter: customObject): [Product]
    relatedProducts(category: customArray, productID: ID): [Product]
    onSaleProducts: [Product]
  }

  extend type Mutation {
    validateUrl(
      url: String!
      entryId: ID
    ): entryUrl
    addProductCategory(
      name: String
      parentId: ID
      url: String
      description: String
      image: Upload
      meta: customObject
    ): statusSchema
    updateProductCategory(
      id: ID!
      name: String
      parentId: ID
      url: String
      description: String
      update_image: Upload
      meta: customObject
    ): statusSchema
    deleteProductCategory(id: ID!): statusSchema
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
      taxClass: String
      status: String
      featured_product: Boolean
      product_type: customObject
      meta: customObject
      custom_field: [customObject]
      specifications: [productSpecificationInput]
    ): statusSchema
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
      taxClass: String
      status: String
      featured_product: Boolean
      product_type: customObject
      meta: customObject
      custom_field: [customObject]
      specifications: [productSpecificationInput]
    ): statusSchema
    deleteProduct(id: ID!): statusSchema
  }
`;