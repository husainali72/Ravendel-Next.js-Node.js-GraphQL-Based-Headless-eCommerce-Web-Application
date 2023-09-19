import gql from "graphql-tag";
const GET_ORDERS = gql`
  {
    orders {
      data {
        id
        orderNumber

   userId

        paymentStatus
        shippingStatus
        shipping
        billing
        products
        couponCode
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

const GET_ORDER = gql`
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
        couponCode
        date
        updated

        shippingAmount 
        taxAmount
grandTotal
cartTotal
discountAmount

      }
      message {
        message
        success
      }
    }
  }
`;

// query($id: ID!) {
//   productCategory(id: $id) {
//     id
//     userId
//     status
//     shipping
//     billing
//     products
//     date
//     updated
//   }
// }

// const DELETE_ORDER = gql`
//   mutation($id: ID!) {
//     deleteOrder(id: $id) {
//       id
//       userId
//       status
//       shipping
//       billing
//       products
//       date
//       updated
//     }
//   }
// `;

const DELETE_ORDER = gql`
  mutation ($id: ID!) {
    deleteOrder(id: $id) {
      message
      success
    }
  }
`;

// const UPDATE_ORDER = gql`
//   mutation(
//     $id: ID!
//     $billing: customObject
//     $shipping: customObject
//     $status: String
//   ) {
//     updateOrder(
//       id: $id
//       billing: $billing
//       shipping: $shipping
//       status: $status
//     ) {
//       id
//       userId
//       status
//       shipping
//       billing
//       products
//       date
//       updated
//     }
//   }
// `;

// mutation(
//   $id: ID!
//   $billing: customObject
//   $shipping: customObject
//   $status: String
// ) {
//   updateOrder(
//     id: $id
//     billing: $billing
//     shipping: $shipping
//     status: $status
//   ) {
//     message
//     success
//   }
// }

const UPDATE_ORDER = gql`
  mutation (
    $id: ID!
    $billing: customObject
    $shipping: customObject
    $shippingStatus: String
    $paymentStatus: String
  ) {
    updateOrder(
      id: $id
      billing: $billing
      shipping: $shipping
      shippingStatus: $shippingStatus
      paymentStatus: $paymentStatus
    ) {
      message
      success
    }
  }
`;

export { GET_ORDERS, GET_ORDER, DELETE_ORDER, UPDATE_ORDER };
