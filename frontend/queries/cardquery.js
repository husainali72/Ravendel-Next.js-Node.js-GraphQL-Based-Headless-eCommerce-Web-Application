import { gql } from "@apollo/client";

export const GET_SINGLE_PRODUCT_QUERY = gql`
  query($id: ID!) {
    product(id: $id) {
      id
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
      taxClass
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
      short_description
    }
  }
`;
export const GET_ORDER = gql`
  query($id: ID!) {
    productCategory(id: $id) {
      id
      userId
      status
      shipping
      billing
      products
      date
      updated
    }
  }
`;
export const GET_ORDERS_Query = gql`
  query {
    orders {
      data {
        id
        customerId
        status
        shipping
        billing
        products
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
