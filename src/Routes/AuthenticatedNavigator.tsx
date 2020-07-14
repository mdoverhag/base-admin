import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Navigator from "../components/Navigator";
import Users from "./Users";

const AuthenticatedNavigator: React.FC = () => (
  <Navigator label="Users">
    <Switch>
      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={Users} />
      <Redirect to="/dashboard" />
    </Switch>
  </Navigator>
);

export default AuthenticatedNavigator;
