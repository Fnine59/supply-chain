import { combineReducers } from 'redux';
import login from './login';
import shopinfo from './shopinfo';
import hqinfo from './hqinfo';
import supplyInfo from './supplyInfo';
import goodsInfo from './goodsInfo';

export default function createReducer() {
  return combineReducers({
    login,
    shopinfo,
    hqinfo,
    supplyInfo,
    goodsInfo,
  });
}
