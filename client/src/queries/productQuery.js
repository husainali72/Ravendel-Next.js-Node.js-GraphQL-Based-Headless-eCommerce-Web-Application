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
      slug
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      date
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation(
    $name: String
    $slug: String
    $categoryId: customArray
    $description: String
    $sku: String
    $quantity: String
    $pricing: customObject
    $feature_image: Upload
    $gallery_image: Upload
    $status: String
  ) {
    addProduct(
      name: $name
      slug: $slug
      categoryId: $categoryId
      description: $description
      sku: $sku
      quantity: $quantity
      pricing: $pricing
      feature_image: $feature_image
      gallery_image: $gallery_image
      status: $status
    ) {
      id
      name
      slug
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      date
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation(
    $id: ID!
    $name: String
    $slug: String
    $categoryId: customArray
    $description: String
    $sku: String
    $quantity: String
    $pricing: customObject
    $feature_image: Upload
    $gallery_image: Upload
    $status: String
  ) {
    updateProduct(
      id: $id
      name: $name
      slug: $slug
      categoryId: $categoryId
      description: $description
      sku: $sku
      quantity: $quantity
      pricing: $pricing
      feature_image: $feature_image
      gallery_image: $gallery_image
      status: $status
    ) {
      id
      name
      slug
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      date
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      slug
      categoryId
      description
      sku
      quantity
      pricing
      feature_image
      gallery_image
      status
      date
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
