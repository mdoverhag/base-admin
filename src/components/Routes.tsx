import React from 'react';

import { Router, Redirect, Route, Switch } from 'react-router-dom';

import Home from '../containers/Home';
import Login from '../containers/Login';
import Logout from '../containers/Logout';

import history from '../lib/history';

interface Props {
  isLoggedIn: boolean;
}

const Routes: React.FC<Props> = props => (
  <Router history={history}>
    {console.log(props)}
    {props.isLoggedIn ? (
      <Switch>
        <Route path="/app" component={Home} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/app" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    )}
  </Router>
);

export default Routes;
