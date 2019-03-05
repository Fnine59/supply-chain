import { combineReducers } from 'redux';
import login from './login';
import shopinfo from './shopinfo';
import hqinfo from './hqinfo';
import supplyInfo from './supplyInfo';
import goodsInfo from './goodsInfo';
import purchase from './purchase';
import selfPurchase from './selfPurchase';
import hqDispatch from './hqDispatch';
import sendGoods from './sendGoods';
import purchaseAccept from './purchaseAccept';
import selfPurchaseAccept from './selfPurchaseAccept';
import depot from './depot';

export default function createReducer() {
  return combineReducers({
    login,
    shopinfo,
    hqinfo,
    supplyInfo,
    goodsInfo,
    purchase,
    selfPurchase,
    hqDispatch,
    sendGoods,
    purchaseAccept,
    selfPurchaseAccept,
    depot,
  });
}
