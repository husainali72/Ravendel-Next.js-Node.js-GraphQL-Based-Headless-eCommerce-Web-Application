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
import { ApolloProvider } from "@apollo/react-hooks";
//import APclient from "./APclient";
import APclient from "./Client";

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={APclient}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

//serviceWorker.unregister();
