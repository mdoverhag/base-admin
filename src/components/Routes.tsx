import React from "react";

import { Router, Redirect, Route, Switch } from "react-router-dom";

import Admin from "./Admin";
import Login from "./Login";
import Logout from "./Logout";
import Verify from "./Verify";

import history from "../lib/history";

const Routes: React.FC = props => {
  //@ts-ignore
  const userToken = window.userToken;
  return (
    <Router history={history}>
      {userToken ? (
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/user" component={Admin} />
          <Redirect to="/user" />
        </Switch>
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
