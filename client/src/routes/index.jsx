import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import history from '../common/utils/history';
import Login from '../containers/Login/index';
import Main from '../containers/Index/index';
import Error404 from '../containers/Error404/index';

// 基础信息模块
import ShopInfo from '../containers/BaseInfo/ShopInfo/index';
import HQInfo from '../containers/BaseInfo/HQInfo/index';
import SupplyInfo from '../containers/BaseInfo/SupplyInfo/index';
import GoodsInfo from '../containers/BaseInfo/GoodsInfo/index';

// 门店管理模块
import Purchase from '../containers/Store/Purchase/index';
import SelfPurchase from '../containers/Store/SelfPurchase/index';

// 总部管理模块
import Dispatch from '../containers/HQ/Dispatch/index';

// 供应商管理模块
import SendGoods from '../containers/Supplier/SendGoods/index';

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/index" component={Main} />
      <Route path="/baseinfo/shop/info" component={ShopInfo} />
      <Route path="/baseinfo/hq/info" component={HQInfo} />
      <Route path="/baseinfo/supply/info" component={SupplyInfo} />
      <Route path="/baseinfo/goods/info" component={GoodsInfo} />
      <Route path="/shop/pr" component={Purchase} />
      <Route path="/shop/selfPr" component={SelfPurchase} />
      <Route path="/hq/orders" component={Dispatch} />
      <Route path="/supply/orders" component={SendGoods} />
      <Route path="/error404" component={Error404} />
      <Route component={Error404} />
    </Switch>
  </Router>
);

export default Routes;
