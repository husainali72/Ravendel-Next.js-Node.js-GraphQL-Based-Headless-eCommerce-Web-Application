/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "apollo-link-error";
import { baseUrl } from "./config";
const httpLink = new createUploadLink({ uri: baseUrl });
const authLink = new ApolloLink((operation, forward) => {
  var token = "";
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("customer")) {
      token = JSON.parse(localStorage.getItem("customer"));
    }
  } else {
  }
  return forward(operation);
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only", // For real-time queries (subscriptions)
    },
    query: {
      fetchPolicy: "network-only", // For regular queries
    },
  },
  onError: ({ networkError, graphQLErrors }) => {},
});

export default client;
