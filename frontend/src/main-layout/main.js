import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Routes from "../routes";

const Main = () => {
  return (
    <main>
      <Switch>
        {Routes.map((route, index) => (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            name={route.name}
            component={route.component}
          />
        ))}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Main;
