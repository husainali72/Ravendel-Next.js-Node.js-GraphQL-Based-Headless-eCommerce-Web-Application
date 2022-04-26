import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Routes from "../routes";
import DynamicScrollToTop from "../routes/DynamicScrollToTop";
import NotFound from "../views/notfound";
import {app_router_base_url} from '../utils/helper';

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
        <Redirect to={`${app_router_base_url}`} />
      </Switch>
    </main>
  );
};

export default Main;
