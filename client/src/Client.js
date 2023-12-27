import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "apollo-link";
import cookie from "react-cookies";
import Auth from "./utils/auth";
const httpLink = new createUploadLink({
  uri: `
https://demo1.ravendel.io/graphql` });
// const httpLink = new createUploadLink({ uri: `http://localhost:8000/graphql` });

const authLink = new ApolloLink((operation, forward) => {


  if (!cookie.load("auth").token) {
    Auth.logout();
  }
  const token = cookie.load("auth").token || "";


  operation.setContext({
    headers: {
      authorization: token,
    },
  });

  return forward(operation);
});

const APclient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});



export default APclient;
