import gql from "graphql-tag";
const GET_CATEGORIES = gql`
  {
    productCategories {
      id
      name
      parentId
      date
      updated
    }
  }
`;

const GET_CATEGORY = gql`
  query($id: ID!) {
    productCategory(id: $id) {
      id
      name
      parentId
      date
      updated
    }
  }
`;

const ADD_CATEGORY = gql`
  mutation($name: String, $parentId: ID) {
    addProductCategory(name: $name, parentId: $parentId) {
      id
      name
      parentId
      date
      updated
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation($id: ID!, $name: String, $parentId: ID) {
    updateProductCategory(id: $id, name: $name, parentId: $parentId) {
      id
      name
      parentId
      date
      updated
    }
  }
`;

const DELETE_CATEGORY = gql`
  mutation($id: ID!) {
    deleteProductCategory(id: $id) {
      id
      name
      parentId
      date
      updated
    }
  }
`;

const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      url
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      featured_product
      product_type
      shipping
      tax_class
      meta
      date
      updated
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation(
    $name: String
    $url: String
    $categoryId: customArray
    $description: String
    $sku: String
    $quantity: String
    $pricing: customObject
    $feature_image: Upload
    $gallery_image: Upload
    $status: String
    $featured_product: Boolean
    $product_type: customObject
    $shipping: customObject
    $tax_class: String
    $meta: customObject
  ) {
    addProduct(
      name: $name
      url: $url
      categoryId: $categoryId
      description: $description
      sku: $sku
      quantity: $quantity
      pricing: $pricing
      feature_image: $feature_image
      gallery_image: $gallery_image
      status: $status
      featured_product: $featured_product
      product_type: $product_type
      shipping: $shipping
      tax_class: $tax_class
      meta: $meta
    ) {
      id
      name
      url
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      featured_product
      product_type
      shipping
      tax_class
      meta
      date
      updated
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation(
    $id: ID!
    $name: String
    $url: String
    $categoryId: customArray
    $description: String
    $sku: String
    $quantity: String
    $pricing: customObject
    $update_feature_image: Upload
    $update_gallery_image: Upload
    $removed_image: customArray
    $status: String
    $featured_product: Boolean
    $product_type: customObject
    $shipping: customObject
    $tax_class: String
    $meta: customObject
  ) {
    updateProduct(
      id: $id
      name: $name
      url: $url
      categoryId: $categoryId
      description: $description
      sku: $sku
      quantity: $quantity
      pricing: $pricing
      update_feature_image: $update_feature_image
      update_gallery_image: $update_gallery_image
      removed_image: $removed_image
      status: $status
      featured_product: $featured_product
      product_type: $product_type
      shipping: $shipping
      tax_class: $tax_class
      meta: $meta
    ) {
      id
      name
      url
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      featured_product
      product_type
      shipping
      tax_class
      meta
      date
      updated
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      url
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      featured_product
      product_type
      shipping
      tax_class
      meta
      date
      updated
    }
  }
`;

export {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT
};
