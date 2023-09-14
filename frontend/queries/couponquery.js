import { gql } from "@apollo/client";

export const APPLY_couponCode = gql`
               query($couponCode: String,$cart: [cartProductsCoupon])
    {
  calculateCoupon(couponCode: $couponCode ,
    cart: $cart
  ) 
  {
    message
    totalCoupon
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