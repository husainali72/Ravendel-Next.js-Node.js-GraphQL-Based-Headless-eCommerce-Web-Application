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

export {
  GET_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_CAT_PRODUCTS,
  GET_PRODUCT_REVIEWS
};
