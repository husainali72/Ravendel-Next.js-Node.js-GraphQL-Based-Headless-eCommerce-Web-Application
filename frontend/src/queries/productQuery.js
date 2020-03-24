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
    }
  }
`;


export { GET_PRODUCTS, GET_CATEGORIES };
