import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import APclient from "./Client";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={APclient}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
