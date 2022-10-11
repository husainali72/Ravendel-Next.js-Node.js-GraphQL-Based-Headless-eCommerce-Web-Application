import gql from "graphql-tag";

const GET_FEATURED_PRODUCTS = gql`
  query {
    featureproducts {
      _id
      name
      feature_image
      pricing
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
    }
  }
`;

const GET_RECENT_PRODUCTS = gql`
  query {
    recentproducts {
      _id
      name
      feature_image
      pricing
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
    }
  }
`;

const ON_SALE_PRODUCTS = gql`
  query {
    onSaleProducts {
      _id
      name
      feature_image
      pricing
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
    }
  }
`;

const GET_PRODUCTS_CATID = gql`
  query ($id: ID!) {
    productsbycatid(cat_id: $id) {
      _id
      name
      feature_image
      pricing
      url
      categoryId {
        id
        name
      }
      quantity
      featured_product
      status
      variant
    }
  }
`;

const PRODUCT_TILE_DATA = gql`
  fragment ProductTile on Product {
    _id
    name
    url
    pricing
    quantity
    feature_image
    status
    brand {
      id
      name
    }
    categoryId {
      id
      name
    }
    attribute
  }
`;

const GET_FILTEREDPRODUCTS = gql`
  query ($config: customObject) {
    filteredProducts(config: $config) {
      ...ProductTile
    }
  }
  ${PRODUCT_TILE_DATA}
`;

const GET_ATTRIBUTES = gql`
  {
    product_attributes {
      id
      name
      values
    }
  }
`;

const GET_PRODUCTS = gql`
  {
    products {
      data {
        _id
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
        updated
        short_description
      }
      message {
        success
        message
      }
    }
  }
`;

const GET_PRODUCT = gql`
  query ($id: ID!) {
    product(id: $id) {
      data {
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
      message {
        message
        success
      }
    }
  }
`;

const GET_SINGLE_PRODUCT = gql`
  query ($url: String!) {
    productbyurl(url: $url) {
      data {
        _id
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
        variant
      }

      message {
        message
        success
      }
    }
  }
`;

const GET_CATEGORIES = gql`
  {
    productCategories {
      data {
        id
        name
        parentId
        date
        updated
        url
        image
      }
      message {
        success
        message
      }
    }
  }
`;

const GET_CAT_PRODUCTS = gql`
  query ($url: String!) {
    productsbycaturl(cat_url: $url) {
      data {
        id
        name
        parentId
        url
        description
        image
        meta
        child_cat {
          id
          name
          url
        }
        filter_brands {
          brandMaster {
            _id
            name
          }
        }
        filter_attributes {
          _id {
            attribute_id
            attribute_value_id
          }
          attributeMaster {
            _id
            name
            values
          }
        }
      }
      message {
        message
        success
      }
    }
  }
`;

const GET_PRODUCT_REVIEWS = gql`
  query ($id: ID!) {
    productwisereview(product_id: $id) {
      data {
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
        date
        updated
        status
      }
    }
  }
`;

const ADD_REVIEW = gql`
  mutation (
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
      id
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
      status
      date
      updated
    }
  }
`;

export {
  GET_PRODUCTS,
  GET_SINGLE_PRODUCT,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_CAT_PRODUCTS,
  GET_PRODUCT_REVIEWS,
  ADD_REVIEW,
  GET_FILTEREDPRODUCTS,
  GET_ATTRIBUTES,
  GET_PRODUCTS_CATID,
  GET_FEATURED_PRODUCTS,
  GET_RECENT_PRODUCTS,
  ON_SALE_PRODUCTS,
};
