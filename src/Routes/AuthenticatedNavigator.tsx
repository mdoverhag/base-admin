import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Navigator from "components/Navigator";
import Dashboard from "Routes/Dashboard";
import Logout from "Routes/Logout";
import Users from "Routes/Users";

const AuthenticatedNavigator: React.FC = () => (
  <Navigator>
    <Switch>
      <Route path="/logout" component={Logout} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={Users} />
      <Redirect to="/dashboard" />
    </Switch>
  </Navigator>
);

export default AuthenticatedNavigator;
