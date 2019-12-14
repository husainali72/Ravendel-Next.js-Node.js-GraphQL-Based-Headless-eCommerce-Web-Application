import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";
import cookie from "react-cookies";
const httpLink = new HttpLink({ uri: `/graphql` });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = cookie.load("auth").token;
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token || ""
    }
  });
  // Call the next link in the middleware chain.
  return forward(operation);
});

const APclient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default APclient;
