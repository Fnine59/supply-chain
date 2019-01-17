import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Login from '../containers/Login';
import Error404 from '../containers/Error404';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
