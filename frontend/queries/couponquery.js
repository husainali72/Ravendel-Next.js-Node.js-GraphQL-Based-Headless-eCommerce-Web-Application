import { gql } from "@apollo/client";

export const APPLY_COUPON_CODE = gql`
  query (
    $userId: ID
    $cartItems: [calculateCartProducts]
    $couponCode: String!
  ) {
    calculateCoupon(
      couponCode: $couponCode
      cartItems: $cartItems
      userId: $userId
    ) {
      message
      success
      id
      userId
      status
      cartItems
      date
      totalSummary
      couponCard
      updated
    }
  }
`;

export const GET_CUOPONS_QUERY = gql`
  query {
    coupons {
      data {
        id
        code
        description
        discountType
        discountValue
        freeShipping
        expire
        minimumSpend
        maximumSpend
        products
        excludeProducts
        categories
        excludeCategories
        categoryTree
        date
        updated
      }
      message {
        message
        success
      }
    }
  }
`;

export const GET_COUPON_BY_ID = gql`
  query ($id: ID!) {
    coupon(id: $id) {
      data {
        id
        code
        description
        discountType
        discountValue
        freeShipping
        expire
        minimumSpend
        maximumSpend
        products
        excludeProducts
        categories
        excludeCategories
        categoryTree
        date
        updated
      }
      message {
        message
        success
      }
    }
  }
`;
