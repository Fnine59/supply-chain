import { combineReducers } from 'redux';
import login from './login';
import shopinfo from './shopinfo';
import hqinfo from './hqinfo';

export default function createReducer() {
  return combineReducers({
    login,
    shopinfo,
    hqinfo,
  });
}
