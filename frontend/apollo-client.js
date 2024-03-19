/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { onError } from 'apollo-link-error'
import { useSession } from "next-auth/react"
import jwt from "next-auth/jwt"
import {  baseUrl } from "./config";

// const httpLink = new createUploadLink({ uri: `https://demo1.ravendel.io/graphql` });

const httpLink = new createUploadLink({ uri: baseUrl });
const authLink = new ApolloLink((operation, forward) => {
  
  var token = ""
  if (typeof window !== "undefined") {
    token = JSON.parse(localStorage.getItem("customer"))
  }
  else {
  }
  return forward(operation);
});


const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const client = new ApolloClient({
  ///////////////////////////////////////////////
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // For real-time queries (subscriptions)
    },
    query: {
      fetchPolicy: 'network-only', // For regular queries
    },
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
  // onError: (e) => { console.log('Error', e) },
});

export default client;
