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
            userId
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
      cartTotal
      taxAmount
      discountGrandTotal 
      
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
            $userId: ID
              $billing: customObject
              $shipping: customObject
              $products: customArray
              $cartTotal: String
              $shippingAmount: String
              $taxAmount: String
              $discountAmount: String
              $grandTotal: String
              $couponCode: String
     ){
       addOrder(
                userId: $userId
                shipping: $shipping
                billing: $billing
                products: $products
                cartTotal:$cartTotal
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