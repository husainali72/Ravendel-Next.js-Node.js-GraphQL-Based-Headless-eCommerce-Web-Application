import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import cookie from "react-cookies";
import { baseUrl } from "./utils/helper";

const httpLink = new HttpLink({ uri: `${baseUrl}/graphql` });

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

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={APclient}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

//serviceWorker.unregister();
