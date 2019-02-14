import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from '../common/utils/history';
import Login from '../containers/Login/index';
import Main from '../containers/Index/index';
import Error404 from '../containers/Error404/index';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/index" component={Main} />
      <Route path="/error404" component={Error404} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

export default Routes;
