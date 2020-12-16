import React, { Fragment, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "./utils/helper";
import { registerNav } from "./utils/navigation";
import { insertToken } from "./store/action/loginAction";
import MainLayout from "./main-layout";
import Login from "./views/login";
import "./assets/scss/index.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login)
  useEffect(() => {
    dispatch(insertToken());
  }, []);

  return (
    <Fragment>
      <BrowserRouter ref={registerNav}>
        <Switch>
          {!isEmpty(login.user_token) && (
            <React.Fragment>
              <MainLayout />
            </React.Fragment>
          )}
          <React.Fragment>
            <Login />
          </React.Fragment>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
