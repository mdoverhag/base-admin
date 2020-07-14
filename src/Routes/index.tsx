import React from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";

import AuthenticatedNavigator from "./AuthenticatedNavigator";
import Login from "./Login";
import Verify from "./Verify";

import history from "../lib/history";

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
