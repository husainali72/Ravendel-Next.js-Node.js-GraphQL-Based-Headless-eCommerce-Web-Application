
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
<<<<<<< HEAD
import reportWebVitals from './reportWebVitals';
=======
import reportWebVitals from "./reportWebVitals";
>>>>>>> dcfef4b9dc5b378cdc4be3a6a997f06bb3a26e09
import store from "./store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/react-hooks";
import APclient from "./Client";
<<<<<<< HEAD
import { ThemeProvider } from"@mui/material/styles";
import theme from "./theme";
import { BrowserRouter } from 'react-router-dom';
import { registerNav } from './utils/navigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter forwardRef={registerNav} >
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={APclient}>
      
        <App />
        
      </ApolloProvider>
    </ThemeProvider>
  </Provider>
  </BrowserRouter>
  </React.StrictMode>
  // <Provider store={store}>
  //   <ThemeProvider theme={theme}>
  //     <ApolloProvider client={APclient}>
  //     <BrowserRouter forwardRef={registerNav}>
  //       <App />
  //       </BrowserRouter>
  //     </ApolloProvider>
  //   </ThemeProvider>
  // </Provider>
 ,

);

reportWebVitals();
=======
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { registerNav } from "./utils/navigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter forwardRef={registerNav}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={APclient}>
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
>>>>>>> dcfef4b9dc5b378cdc4be3a6a997f06bb3a26e09
