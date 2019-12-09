import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { gql } from "apollo-boost";
import cookie from "react-cookies";
import { baseUrl } from "./utils/helper";

const httpLink = createHttpLink({
  uri: "http://localhost:7786/graphql"
  //uri: `${baseUrl}/graphql`
});

const authLink = setContext((_, { headers }) => {
  const token = cookie.load("auth").token;
  return {
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : ""
      authorization: token || ""
    }
  };
});

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

const client = new ApolloClient({
  uri: "http://localhost:7786/graphql"
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
