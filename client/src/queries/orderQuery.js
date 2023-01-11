import gql from "graphql-tag";
const GET_ORDERS = gql`
  {
    orders {
      data {
        id
        customer_id
        payment_status
        shipping_status
        shipping
        billing
        products
        coupon_code
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
  
  query($id: ID!){
    order(id: $id){
        data{
          id
          customer_id
          payment_status
          shipping_status
          shipping
          billing
          products
          coupon_code
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

// query($id: ID!) {
//   productCategory(id: $id) {
//     id
//     user_id
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
  

  mutation(
    $id: ID!
    $billing: customObject
    $shipping: customObject
    $shipping_status: String
    $payment_status: String
  ) {
    updateOrder(
      id: $id
      billing: $billing
      shipping: $shipping
      shipping_status: $shipping_status
      payment_status: $payment_status
    ) {
      message
      success
    }
  }
`;



export { GET_ORDERS, GET_ORDER, DELETE_ORDER, UPDATE_ORDER };
