import { gql } from "@apollo/client";

export const APPLY_COUPON_CODE = gql`
               query($coupon_code: String,$cartItem: [couponCartProducts],$total_shipping : String
                $total_tax : String,$grand_total:String,$cart_total:String)
    {
  calculateCoupon(coupon_code: $coupon_code ,
    cartItem: $cartItem,
    total_shipping:$total_shipping,
    total_tax:$total_tax,
    grand_total:$grand_total,
    cart_total:$cart_total


  ) 
  {
    message
    total_coupon
    total_coupon
    message
    success
   
    cart_total 
    total_shipping 
    total_tax 
  grand_total
  discount_grand_total 
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