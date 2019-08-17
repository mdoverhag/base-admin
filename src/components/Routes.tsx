import React, { useState, useEffect } from "react";

import { Router, Redirect, Route, Switch } from "react-router-dom";

import Admin from "../containers/Admin";
import Login from "./Login";
import Logout from "./Logout";
import Verify from "./Verify";

import history from "../lib/history";

interface Props {
  isLoggedIn: boolean;
}

const Routes: React.FC<Props> = props => {
  const [hasToken, setHasToken] = useState();
  useEffect(() => {
    (async () => {
      const accessToken = await localStorage.getItem("accessToken");
      setHasToken(Boolean(accessToken));
    })();
  }, [props.isLoggedIn]);
  if (hasToken === undefined) {
    return <div>Loading...</div>;
  }
  return (
    <Router history={history}>
      {hasToken ? (
        <Switch>
          <Route path="/app" component={Admin} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/app" />
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
