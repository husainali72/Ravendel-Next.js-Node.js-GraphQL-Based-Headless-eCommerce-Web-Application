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
      short_description
    }
  }
`;
export const GET_ORDER = gql`
  query($id: ID!) {
    productCategory(id: $id) {
      id
      user_id
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
        customer_id
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
