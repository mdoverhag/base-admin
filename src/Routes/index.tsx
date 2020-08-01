import React from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";

import AuthenticatedNavigator from "Routes/AuthenticatedNavigator";
import Login from "Routes/Login";
import Verify from "Routes/Verify";

import history from "lib/history";

const Routes: React.FC = () => {
  if (process.env.NODE_ENV === "development") {
    //@ts-ignore
    window.userToken = localStorage.getItem("userToken");
  }
  //@ts-ignore
  const userToken = window.userToken;
  return (
    <Router history={history}>
      {userToken ? (
        <AuthenticatedNavigator />
      ) : (
        <Switch>
          <Route path="/login/verify" component={Verify} />
          <Route path="/login" component={Login} />
          <Redirect to="/login" />
        </Switch>
      )}
    </Router>
  );
};

export default Routes;
