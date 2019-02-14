import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from '../common/utils/history';
import Login from '../containers/Login/index';
import Main from '../containers/Index/index';
import Error404 from '../containers/Error404/index';

import ShopInfo from '../containers/BaseInfo/ShopInfo/index';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/index" component={Main} />
      <Route path="/baseinfo/shop/info" component={ShopInfo} />
      <Route path="/error404" component={Error404} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

export default Routes;
