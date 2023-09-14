import { gql } from "@apollo/client";

export const GET_ORDERS_QUERY = gql`
  query{
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
      message{
        message
        success
      }
    }
  }
`;
export const GET_CUSTOMER_ORDERS_QUERY = gql`
  query ($id:ID!){
  orderbyUser(userId: $id) {
           data {
            billing
      customerId
      date
      couponCode
      discountAmount
      grandTotal
      id
      products
      shipping
      shippingAmount
      shippingStatus
      paymentStatus
      subtotal
      taxAmount
      updated
  }
  message {
      message
      success
  }
  }
  }
`
export const GET_SINGLE_ORDER_DETAILS = gql`
   query ($id:ID!){
  order(id: $id) {
            data{
                id
                customerId
                status
                shipping
                billing
                products
                date
                updated
                subtotal
                shippingAmount
                taxAmount
                discountAmount
                grandTotal
            }
            message{
                message
                success
            }
  }
}
`

export const ADD_ORDER = gql`
  mutation(
            $customerId: ID
              $billing: customObject
              $shipping: customObject
              $products: customArray
              $subtotal: String
              $shippingAmount: String
              $taxAmount: String
              $discountAmount: String
              $grandTotal: String
              $couponCode: String
     ){
       addOrder(
                customerId: $customerId
                shipping: $shipping
                billing: $billing
                products: $products
                subtotal:$subtotal
              shippingAmount:$shippingAmount
                taxAmount:$taxAmount
                discountAmount:$discountAmount
                  grandTotal :$grandTotal
                  couponCode :$couponCode
    ){
        message
        success
    }
}
  `