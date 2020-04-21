import gql from "graphql-tag";

const GET_PRODUCTS = gql`
  {
    products {
      id
      name
      categoryId
      url
      sku
      description
      shippingDetails
      manufactureDetails
      quantity
      pricing
      feature_image
      gallery_image
      meta
      shipping
      tax_class
      status
      featured_product
      product_type
      custom_field
      date
      updated
      short_description
    }
  }
`;

const GET_PRODUCT = gql`
  query($id: ID!) {
    product(id: $id) {
      id
      name
      url
      sku
      description
      shippingDetails
      manufactureDetails
      quantity
      pricing
      feature_image
      gallery_image
      meta
      shipping
      tax_class
      status
      featured_product
      product_type
      custom_field
      date
      updated
      categoryId
      short_description
    }
  }
`;

const GET_CATEGORIES = gql`
  {
    productCategories {
      id
      name
      parentId
      date
      updated
      url
    }
  }
`;

const GET_CAT_PRODUCTS = gql`
  query($url: String!) {
    productsbycaturl(cat_url: $url) {
      id
      name
      url
      sku
      description
      shippingDetails
      manufactureDetails
      quantity
      pricing
      feature_image
      gallery_image
      meta
      shipping
      tax_class
      status
      featured_product
      product_type
      custom_field
      date
      updated
      categoryId {
        id
        name
      }
    }
  }
`;

const GET_PRODUCT_REVIEWS = gql`
  query($id: ID!) {
    productwisereview(product_id: $id) {
      title
      customer_id {
        id
        first_name
      }
      product_id {
        id
        name
      }
      email
      review
      rating
      date
      updated
    }
  }
`;

const ADD_REVIEW = gql`
  mutation(
    $title: String
    $customer_id: String
    $product_id: String
    $email: String
    $review: String
    $rating: String
    $status: String
  ) {
    addReview(
      title: $title
      customer_id: $customer_id
      product_id: $product_id
      email: $email
      review: $review
      rating: $rating
      status: $status
    ) {
      title
      customer_id
      product_id
      email
      review
      rating
      status
    }
  }
`;

// title
// customer_id
// product_id
// email
// review
// rating
// status

// id
// title
// customer_id {
//   id
//   first_name
// }
// product_id {
//   id
//   name
// }
// email
// review
// rating
// status
// date
// updated

export {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_CAT_PRODUCTS,
  GET_PRODUCT_REVIEWS,
  ADD_REVIEW,
};
