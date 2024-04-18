import { gql } from "@apollo/client";

export const GET_ORDERS_QUERY = gql`
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
      message {
        message
        success
      }
    }
  }
`;
export const GET_CUSTOMER_ORDERS_QUERY = gql`
  query ($id: ID!) {
    orderbyUser(userId: $id) {
      data {
        id
        orderNumber
        userId
        paymentStatus
        shippingStatus
        shipping
        billing
        products
        couponCard
        totalSummary
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
export const GET_SINGLE_ORDER_DETAILS = gql`
  query ($id: ID!) {
    order(id: $id) {
      data {
        id
        orderNumber
        userId
        paymentStatus
        shippingStatus
        shipping
        billing
        products
        totalSummary
        couponCard
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

export const ADD_ORDER = gql`
  mutation ($userId: ID, $billing: customObject, $shipping: customObject,  $couponCode: String) {
    addOrder(userId: $userId, shipping: $shipping, billing: $billing, couponCode: $couponCode) {
      id
      message
      success
      redirectUrl
      paypalOrderId
      razorpayOrderId
    }
  }
`;
export const UPDATE_PAYMENT_STATUS = gql`
  mutation ($id: ID!, $paymentStatus: String!) {
    updatePaymentStatus(id: $id, paymentStatus: $paymentStatus) {
      message
      success
    }
  }
`;
