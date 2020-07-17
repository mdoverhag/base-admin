import React from "react";
import { Route, Switch } from "react-router-dom";

import CreateUser from "Routes/Users/CreateUser";
import ListUsers from "Routes/Users/ListUsers";
import UpdateUser from "Routes/Users/UpdateUser";

const Users: React.FC = () => (
  <Switch>
    <Route path="/users/create" component={CreateUser} />
    <Route path="/users/:id" component={UpdateUser} />
    <Route path="/users" component={ListUsers} />
  </Switch>
);

export default Users;
