import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query  {
products {
    data {
      _id
      rating
      name
      categoryId {
        id
        name
      }
      url
      sku
      description
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
      attribute
      attribute_master {
        id
        name
        attribute_values
        createdAt
        updatedAt
      }

      variation_master {
        id
        product_id
        combination
        quantity
        sku
        image
        pricing
        createdAt
        updatedAt
      }
      updated
      short_description
    }
  }
}
`;
const ATTRIBUTE_TILE = gql`
  fragment AttributeTile on productAttribute {
    id
    name
    values
    date
    updated
  }
`;
export const GET_ATTRIBUTES = gql`
  {
    product_attributes {
      data {
        ...AttributeTile
      }
      message {
        message
        success
      }
    }
  }
  ${ATTRIBUTE_TILE}
`;
export const GET_SINGLE_PRODUCT = gql`
  query ($url: String!) {
  productbyurl(url: $url) {
    data {
      _id
      rating
      name
      url
      sku
      description
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
      attribute
      attribute_master {
        id
        name
        attribute_values
        createdAt
        updatedAt
      }
      categoryId {
        id
        name
        __typename
      }
      variation_master {
        id
        product_id
        combination
        quantity
        sku
        image
        pricing
        createdAt
        updatedAt
      }
      short_description
      variant
      __typename
    }
    message {
      message
      success
      __typename
    }
    __typename
  }
}
`;
export const GET_PRODUCT_REVIEWS = gql`
query ($id: ID!) {
    productwisereview(product_id: $id) {
        data{
      id
      title
      customer_id {
        id
        first_name
      }
      product_id {
        _id
        name
      }
      email
      review
      rating
      status
      date
      updated
    }
    message{
        message
        success
    }
  }
  }
`;
export const GET_REVIEWS = gql`
  query {
    reviews {
      data {
        id
        title
        customer_id {
          id
          first_name
        }
        product_id {
          _id
          name
        }
        email
        review
        rating
        status
        date
        updated
      }
      message {
        success
        message
      }
    }
  } 
`;
export const ADD_REVIEW = gql`
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
     
    message
    success

    }
  }
`;

export const CHECK_ZIPCODE = gql`
  query($zipcode: String!) {
    checkZipcode(zipcode: $zipcode) {
        message
        success
    }
  }
`;