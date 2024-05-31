import gql from "graphql-tag";

export const ADD_TO_CART_QUERY = gql`
  mutation (
    $userId: ID!
    $productId: String
    $productTitle: String
    $productPrice: String
    $productImage: String
    $qty: Int
    $attributes: customArray
    $variantId: String
    $productQuantity: Int
  ) {
    addToCart(
      userId: $userId
      productId: $productId
      productTitle: $productTitle
      productPrice: $productPrice
      productImage: $productImage
      qty: $qty
      attributes: $attributes
      variantId: $variantId
      productQuantity: $productQuantity
    ) {
      message
      success
    }
  }
`;
export const GET_CART_ITEM_QUERY = gql`
  query ($id: ID!) {
    cart(id: $id) {
      id
      userId
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
`;
export const GET_USER_CART = gql`
  query ($id: ID!) {
    calculateCart(userId: $id) {
      id
      userId
      status
      cartItems
      date
      totalSummary

      updated
    }
  }
`;
export const GET_USER_CART_COUNT = gql`
  query GetCartDetails($userId: ID) {
    getCartDetails(userId: $userId) {
      data
      message
      success
    }
  }
`;
export const CALCULATE_CART_WITHOUT_LOGIN = gql`
  query ($cartItems: [calculateCartProducts]) {
    calculateCart(cartItems: $cartItems) {
      id
      userId
      status
      cartItems
      date
      totalSummary
      updated
    }
  }
`;
export const GET_ADDTOCART_QUERY = gql`
  query {
    carts {
      data {
        id
        userId
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
`;
// export const ADD_TO_CART_QUERY = gql`
//   mutation(
//      $id: ID
//     $productId:String
//     $qty:Float
//      ){
//     addToCart(customerId: $id){
//        id
//     userId: ID
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
  mutation ($userId: ID, $products: [cartProduct]) {
    addCart(userId: $userId, products: $products) {
      message
      success
    }
  }
`;
export const CHANGE_QTY = gql`
  mutation ($userId: ID!, $productId: ID!, $qty: Int!) {
    changeQty(userId: $userId, productId: $productId, qty: $qty) {
      message
      success
    }
  }
`;
export const DELETE_CART_PRODUCTS = gql`
  mutation ($userId: ID!, $productId: ID!) {
    deleteCartProduct(userId: $userId, productId: $productId) {
      message
      success
    }
  }
`;

export const DELETE_CART = gql`
  mutation ($userId: ID!) {
    deleteCart(userId: $userId) {
      message
      success
    }
  }
`;

export const UPDATE_CART_PRODUCT = gql`
  mutation ($id: ID!, $products: [cartProduct]) {
    updateCart(id: $id, products: $products) {
      message
      success
    }
  }
`;

export const CALCULATE_CART_TOTAL = gql`
  query ($cartItem: [calculateCartProducts]) {
    calculateCart(cartItem: $cartItem) {
      totalShipping
      grandTotal
      totalTax
      cartTotal
      cartItem {
        productImage
        productTitle
        qty
        productId
        productPrice
        productShipping
        productTax
      }
    }
  }
`;
export const CART_ADDITIONAL_DETAIL = gql`
  query Query($productIds: [ID]) {
    cartAdditionalDetails(productIds: $productIds)
  }
`;
