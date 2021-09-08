import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isEmpty } from "./utils/helper";
import { registerNav } from "./utils/navigation";
import { insertToken } from "./store/action/loginAction";
import MainLayout from "./main-layout";
import Login from "./views/login";
import { client_app_route_url } from "./utils/helper";
import "./assets/scss/index.css";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(insertToken());
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [loading]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Loading.....</p>
      </div>
    );
  }

  return (
    <Fragment>
      <BrowserRouter ref={registerNav}>
        <Switch>
          <Route
            exact={true}
            path={`${client_app_route_url}login`}
            component={Login}
          />
           {isEmpty(login.user_token) ? (
            <Redirect to={`${client_app_route_url}login`} />
          ) : null}

          <MainLayout />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
