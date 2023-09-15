import { gql } from "@apollo/client";

export const APPLY_COUPON_CODE = gql`
               query($couponCode: String,
                $cartItem: [couponCartProducts],
                $totalShipping : String
                $totalTax : String,
                $grandTotal:String,
                $cartTotal:String)
    {
  calculateCoupon(couponCode: $couponCode ,
    cartItem: $cartItem,
    totalShipping:$totalShipping,
    totalTax:$totalTax,
    grandTotal:$grandTotal,
    cartTotal:$cartTotal


  ) 
  {
    message
    totalCoupon
    message
    success
    cartItem{
      productId
    qty  
    productImage 
    productTitle 
    productShipping 
    productTax 
    productPrice 
    productTotal 
    variantId   
     discountGrandTotal 
    }
    cartTotal 
    totalShipping 
    totalTax 
    grandTotal
    discountGrandTotal 

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