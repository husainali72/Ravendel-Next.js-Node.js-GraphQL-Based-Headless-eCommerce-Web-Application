import { ApolloClient } from "@apollo/client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createUploadLink } from "apollo-upload-client";
import { ApolloLink } from "apollo-link";
import cookie from "react-cookies";

// const httpLink = new createUploadLink({ uri: `/graphql` });
const httpLink = new createUploadLink({ uri: `http://localhost:8000/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = cookie.load("auth").token || "";
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token,
    },
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

const APclient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// if u dont wanna __typename in retrieving data
/* cache: new InMemoryCache({
  addTypename: false,
}) */

export default APclient;
