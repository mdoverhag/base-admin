import React from 'react';

import { Router, Redirect, Route, Switch } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Logout from './Logout';

import history from '../lib/history';

const Routes: React.FC = () => (
  <Router history={history}>
    <Switch>
      <Route path="/app" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Redirect to="/app" />
    </Switch>
  </Router>
);

export default Routes;
