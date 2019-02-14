import { combineReducers } from 'redux';
import login from './login';
import shopinfo from './shopinfo';

export default function createReducer() {
  return combineReducers({
    login,
    shopinfo,
  });
}
