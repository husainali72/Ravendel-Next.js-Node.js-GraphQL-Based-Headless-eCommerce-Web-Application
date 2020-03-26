import gql from "graphql-tag";
const GET_COUPONS = gql`
  {
    coupons {
      id
      code
      description
      discount_type
      discount_value
      free_shipping
      expire
      minimum_spend
      maximum_spend
      products
      exclude_products
      categories
      exclude_categories
      date
      updated
    }
  }
`;

const GET_COUPON = gql`
  query($id: ID!) {
    coupon(id: $id) {
      id
      code
      description
      discount_type
      discount_value
      free_shipping
      expire
      minimum_spend
      maximum_spend
      products
      exclude_products
      categories
      exclude_categories
      date
      updated
    }
  }
`;

const ADD_COUPON = gql`
  mutation(
    $code: String
    $description: String
    $discount_type: String
    $discount_value: String
    $free_shipping: Boolean
    $expire: String
    $minimum_spend: String
    $maximum_spend: String
    $products: customArray
    $exclude_products: customArray
    $categories: customArray
    $exclude_categories: customArray
  ) {
    addCoupon(
      code: $code
      description: $description
      discount_type: $discount_type
      discount_value: $discount_value
      free_shipping: $free_shipping
      expire: $expire
      minimum_spend: $minimum_spend
      maximum_spend: $maximum_spend
      products: $products
      exclude_products: $exclude_products
      categories: $categories
      exclude_categories: $exclude_categories
    ) {
      id
      code
      description
      discount_type
      discount_value
      free_shipping
      expire
      minimum_spend
      maximum_spend
      products
      exclude_products
      categories
      exclude_categories
      date
      updated
    }
  }
`;

const UPDATE_COUPON = gql`
  mutation(
    $id: ID!
    $code: String
    $description: String
    $discount_type: String
    $discount_value: String
    $free_shipping: Boolean
    $expire: String
    $minimum_spend: String
    $maximum_spend: String
    $products: customArray
    $exclude_products: customArray
    $categories: customArray
    $exclude_categories: customArray
  ) {
    updateCoupon(
      id: $id
      code: $code
      description: $description
      discount_type: $discount_type
      discount_value: $discount_value
      free_shipping: $free_shipping
      expire: $expire
      minimum_spend: $minimum_spend
      maximum_spend: $maximum_spend
      products: $products
      exclude_products: $exclude_products
      categories: $categories
      exclude_categories: $exclude_categories
    ) {
      id
      code
      description
      discount_type
      discount_value
      free_shipping
      expire
      minimum_spend
      maximum_spend
      products
      exclude_products
      categories
      exclude_categories
      date
      updated
    }
  }
`;

const DELETE_COUPON = gql`
  mutation($id: ID!) {
    deleteCoupon(id: $id) {
      id
      code
      description
      discount_type
      discount_value
      free_shipping
      expire
      minimum_spend
      maximum_spend
      products
      exclude_products
      categories
      exclude_categories
      date
      updated
    }
  }
`;

export { GET_COUPONS, GET_COUPON, ADD_COUPON, UPDATE_COUPON, DELETE_COUPON };
