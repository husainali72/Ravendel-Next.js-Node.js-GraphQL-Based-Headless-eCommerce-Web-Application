import { gql } from "@apollo/client";

export const APPLY_COUPON_CODE = gql`
               query($coupon_code: String,$cart: [cartProducts])
    {
  calculateCoupon(coupon_code: $coupon_code ,
    cart: $cart
  ) 
  {
    message
    total_coupon
    success
  }
}`;

export const GET_CUOPONS_QUERY = gql`
  query {
    coupons {
        data {
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
        message{
               message
            success
              }
          }
  }`;

export const GET_COUPON_BY_ID = gql`  query($id:ID!) {
    coupon(id:$id){
        data {
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
 message{
     message
     success
 }
  }
  }`