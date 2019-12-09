import React, { useState, useEffect } from "react";
// import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.scss";
import { connect } from "react-redux";

import { Login } from "./views/Pages";
import DefaultLayout from "./containers/DefaultLayout";
import { registerNav } from "./utils/navigation";
import { insertToken } from "./store/action/loginAction";
import { isEmpty } from "./utils/helper";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

const App = props => {
  useEffect(() => {
    props.insertToken();
  }, []);

  return (
    <BrowserRouter ref={registerNav}>
      <React.Suspense fallback={loading()}>
        <Switch>
          {!isEmpty(props.login.user_token) && [
            <React.Fragment>
              <Redirect from="*" to="/" />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={props => <Page404 {...props} />}
              />
              <Route exact path="/500" name="Page 500" component={Register} />
              <Route path="/" name="Home" component={DefaultLayout} />
            </React.Fragment>
          ]}
          <React.Fragment>
            <Redirect from="*" to="/login" />
            <Route exact path="/login" name="Login Page" component={Login} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={props => <Register {...props} />}
            />
          </React.Fragment>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  //isLoggin: state.login
  login: state.login
});

const mapDispatchToProps = {
  insertToken
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
