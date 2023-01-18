import { gql } from "@apollo/client";

export const GET_ORDERS_QUERY = gql`
  query{
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
export const GET_CUSTOMER_ORDERS_QUERY = gql`
  query ($user_id:ID!){
  orderbyUser(user_id: $user_id) {
           data {
            billing
      customer_id
      date
      discount_amount
      grand_total
      id
      products
      shipping
      shipping_amount
      status
      subtotal
      tax_amount
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
                customer_id
                status
                shipping
                billing
                products
                date
                updated
                subtotal
                shipping_amount
                tax_amount
                discount_amount
                grand_total
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
            $customer_id: ID
              $billing: customObject
              $shipping: customObject
              $products: customArray
              $subtotal: String
              $shipping_amount: String
              $tax_amount: String
              $discount_amount: String
              $grand_total: String
     ){
       addOrder(
                customer_id: $customer_id
                shipping: $shipping
                billing: $billing
                products: $products
                subtotal:$subtotal
              shipping_amount:$shipping_amount
                tax_amount:$tax_amount
                discount_amount:$discount_amount
                  grand_total :$grand_total
    ){
        message
        success
    }
}
  `