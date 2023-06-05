import gql from "graphql-tag";

export const ADD_TO_CART_QUERY = gql`
 mutation (
     $user_id:ID!,
    $product_id:String,
    $product_title:String,
    $product_price:Float,
    $product_image:String,
    $total:Float,
    $qty:Int,
    $shipping_class:String,
    $tax_class:String
    $attributes:customArray
    $variant_id:String
    $product_quantity:Int
        ){
    addToCart(
            total: $total
            user_id: $user_id,
            product_id :$product_id,
            product_title : $product_title,
            product_price : $product_price,
            product_image : $product_image,
            qty : $qty,
          attributes: $attributes
            product_quantity:$product_quantity
            variant_id:$variant_id
            shipping_class : $shipping_class,
            tax_class : $tax_class
            )
            {
              message
              success
            }
          }`
export const GET_CART_ITEM_QUERY = gql`
 query($id: ID!){
    cart (id:$id){
       id
    user_id
    status
    total
    products
    updated
      
    }
      message {
        message
        success
      }
  }`
export const GET_USER_CART = gql`
   query ($id:ID!){
  cartbyUser(user_id: $id) {
  id
    user_id
    status
    total
    products
    date

    updated
  }
}`
export const GET_ADDTOCART_QUERY = gql`
 query{
    carts{
        data{
       id
    user_id
    status
    total
    products
    updated
      
        }
        message {
        message
        success
      }
    }
  }
  `
// export const ADD_TO_CART_QUERY = gql`
//   mutation(
//      $id: ID
//     $product_id:String 
//     $qty:Float
//      ){
//     addToCart(customer_id: $id){
//        id
//     user_id: ID
//     status: String
//     total: Float
//     products: metaKeyValueArray
//     date: Date
//     updated: Date

//     }
//         message {
//         message
//         success
//       }
//     }`


export const ADD_CART = gql`
    mutation(
    $user_id: ID
    $products:[cartProduct]
   
) {
 addCart(
    user_id:$user_id
    products:$products
  )
  {
    message
    success
  }
}
    `

export const DELETE_CART_PRODUCTS = gql`
    mutation(
    $id:ID!,
    $product_id: ID!
    ) {
  deleteCartProduct(id:$id,
  product_id: $product_id)
   {
     message
     success
   }
 }
    `

export const DELETE_CART = gql`  
    mutation($id:ID!) {
      deleteCart(id: $id)
       {
    message
    success
      }
}`;

export const UPDATE_CART_PRODUCT = gql`
  mutation($id: ID!, $products: [cartProduct]){
    updateCart(id:$id,products:$products){
         
    message
    success
  }
    }
`;

export const CALCULATE_CART_TOTAL = gql`
                            query ($total_coupon : Float,
                              $cart : [cartProducts]){
                            calculateCart(total_coupon : $total_coupon,cart: $cart
                            ) {
                              total_tax {
                                name
                                amount
                              }
                              total_shipping {
                                name
                                amount
                              }
                              subtotal
                              total_coupon
                              grand_total
                            }
                          }`