import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Routes from "../routes";
import DynamicScrollToTop from "../routes/DynamicScrollToTop";
import NotFound from "../views/notfound";

const Main = () => {
  return (
    <main>
      <DynamicScrollToTop />
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
        <Route path="*" component={NotFound} />
        <Redirect to="/" />
      </Switch>
    </main>
  );
};

export default Main;
