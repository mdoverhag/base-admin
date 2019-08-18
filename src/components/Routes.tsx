import React, { useState, useEffect } from "react";

import { Router, Redirect, Route, Switch } from "react-router-dom";

import Admin from "../containers/Admin";
import Login from "./Login";
import Logout from "./Logout";
import Verify from "./Verify";

import history from "../lib/history";
import { setProfile } from "../store/profile/actions";
import store from "../store";

interface Props {
  isLoggedIn: boolean;
}

const Routes: React.FC<Props> = props => {
  const [hasToken, setHasToken] = useState();
  useEffect(() => {
    (() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        store.dispatch(setProfile({ email: "" }));
      }
      setHasToken(Boolean(accessToken));
    })();
  }, [props.isLoggedIn]);
  if (hasToken === undefined) {
    return <div>Loading...</div>;
  }
  //@ts-ignore
  console.log(window.userToken);
  return (
    <Router history={history}>
      {hasToken ? (
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
