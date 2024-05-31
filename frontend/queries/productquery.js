import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query {
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
        updated
        short_description
      }
    }
  }
`;
export const GET_FILTERED_PRODUCTS = gql`
  query GetProducts(
    $mainFilter: customObject
    $filters: customArray
    $sort: customObject
    $pageNo: Int
    $limit: Int
  ) {
    getCategoryPageData(
      mainFilter: $mainFilter
      filters: $filters
      sort: $sort
      pageNo: $pageNo
      limit: $limit
    ) {
      message
      success
      isMostParentCategory
      mostParentCategoryData
      categoryTree
      filterData
      productData
      sort
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
        breadcrumb
        attributes
        variations
        specifications {
          key
          value
          group
          attributeValueId
          attributeId
        }
        rating
        ratingCount
        levelWiseRating
        name
        url
        sku
        description
        quantity
        pricing
        feature_image
        brand {
          id
          name
        }
        gallery_image
        meta
        status
        featured_product
        product_type
        custom_field
        date
        updated
        categoryId {
          id
          name
          __typename
        }
        short_description
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
  query Productwisereview($productId: ID!, $page: Int, $limit: Int) {
    productwisereview(productId: $productId, page: $page, limit: $limit) {
      count
      reviews {
        review
        date
        rating
        title
        customerId {
          firstName
          lastName
        }
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
  mutation (
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
export const PARENT_CATEGORIES = gql`
query categories {
  parentCategories {
    message {
      message
      success
    }
    data {
      name
      url
    }
  }
}
`;
export const CHECK_ZIPCODE = gql`
  query ($zipcode: String!) {
    checkZipcode(zipcode: $zipcode) {
      message
      success
    }
  }
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($searchTerm: String!, $page: Int!, $limit: Int!) {
    searchProducts(searchTerm: $searchTerm, page: $page, limit: $limit) {
      count
      products {
        name
        url
        pricing
        feature_image
        rating
        quantity
      }
    }
  }
`;
export const ADDITIONA_DETAIL = gql`
query ($productId: ID!) {
  additionalDetails(productId: $productId)
}

`;
