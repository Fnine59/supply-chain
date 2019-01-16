import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Error404 from '../containers/Error404';
import Error405 from '../containers/Error405';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/test" component={Error405} />
      <Route path="/" component={Error404} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
