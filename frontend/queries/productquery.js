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
      taxClass
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
        productId
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
export const GET_FILTERED_PRODUCTS = gql`
query GetProducts($mainFilter: customObject, $filters: customArray, $pageNo: Int, $limit: Int) {
  getProducts(mainFilter: $mainFilter, filters: $filters, pageNo: $pageNo, limit: $limit) {
    message
    success
    category
    filterData
    productData
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
    productAttributes {
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
      brand{
        id
        name
      }
      gallery_image
      meta
      shipping
      taxClass
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
        productId
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
    productwisereview(productId: $id) {
        data{
      id
      title
      customerId {
        id
        firstName
      }
      productId {
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
        customerId {
          id
          firstName
        }
        productId {
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
    $customerId: String
    $productId: String
    $email: String
    $review: String
    $rating: String
    $status: String
  ) {
    addReview(
      title: $title
      customerId: $customerId
      productId: $productId
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