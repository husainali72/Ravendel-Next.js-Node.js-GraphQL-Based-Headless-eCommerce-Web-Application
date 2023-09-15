import { gql } from "@apollo/client";

export const CHECKOUT_ORDER_QUERY = gql`
mutation($userId: ID, $products: [checkoutProduct]) {
    addCheckout(userId:$userId ,
    products:$products
    ) {
      id
    userId
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
    userId
    shipping
    payment
    products
    status
    date
    updated
  }
  }`;

export const GET_CHECKOUT_DETAILS_BY_userId = gql` 
query($userId: ID!) {
    checkoutbyUser(userId:$userId) {
    id
    userId
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
