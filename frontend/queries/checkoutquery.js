import { gql } from "@apollo/client";

export const CHECKOUT_ORDER_QUERY = gql`
mutation($user_id: ID, $products: [checkoutProduct]) {
    addCheckout(user_id:$user_id ,
    products:$products
    ) {
      id
    user_id
    shipping
    payment
    products
    status
    date
    updated
    }
  }`

export const GET_CHECKOUTS = gql`
query {
    checkouts {
       id
    user_id
    shipping
    payment
    products
    status
    date
    updated
  }
  }`;

export const GET_CHECKOUT_DETAILS_BY_USER_ID = gql` 
query($user_id: ID!) {
    checkoutbyUser(user_id:$user_id) {
    id
    user_id
    shipping
    payment
    products
    status
    date
    updated
  }
  }`;

export const DELETE_CHECKOUT = gql`
  mutation($id:ID!) {
      deleteCheckout(id: $id)
  }`
