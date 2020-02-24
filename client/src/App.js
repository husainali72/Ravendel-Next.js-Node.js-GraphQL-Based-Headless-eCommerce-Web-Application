import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isEmpty } from './utils/helper';
import { registerNav } from "./utils/navigation";
import { insertToken } from "./store/action/loginAction";
import MainLayout from './main-layout';
import Login from './views/login';
import './assets/scss/index.css';

const App = props => {
  useEffect(() => {
    props.insertToken();
  }, []);

  return (
    <Fragment>
        <BrowserRouter ref={registerNav}>
            <Switch>
              {!isEmpty(props.login.user_token) && (
              <React.Fragment>
                <Redirect from="*" to="/" />
                <Route path="/" name="Home" component={MainLayout} />
              </React.Fragment>
            )}
            <React.Fragment>
              <Redirect from="*" to="/login" />
              <Route exact path="/login" name="Login Page" component={Login} />
            </React.Fragment>
            </Switch>
        </BrowserRouter>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  login: state.login
});

const mapDispatchToProps = {
  insertToken
};

export default connect(mapStateToProps, mapDispatchToProps)(App);