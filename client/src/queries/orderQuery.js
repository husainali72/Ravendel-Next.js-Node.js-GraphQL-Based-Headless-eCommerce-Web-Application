import gql from "graphql-tag";
const GET_ORDERS = gql`
  {
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

const GET_ORDER = gql`
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

// const DELETE_ORDER = gql`
//   mutation($id: ID!) {
//     deleteOrder(id: $id) {
//       id
//       user_id
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
  mutation($id: ID!) {
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
//       user_id
//       status
//       shipping
//       billing
//       products
//       date
//       updated
//     }
//   }
// `;
const UPDATE_ORDER = gql`
  mutation(
    $id: ID!
    $billing: customObject
    $shipping: customObject
    $status: String
  ) {
    updateOrder(
      id: $id
      billing: $billing
      shipping: $shipping
      status: $status
    ) {
      message
      success
    }
  }
`;

export { GET_ORDERS, GET_ORDER, DELETE_ORDER, UPDATE_ORDER };
