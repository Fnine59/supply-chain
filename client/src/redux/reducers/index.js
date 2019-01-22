import { combineReducers } from 'redux';
import login from './login';

export default function createReducer() {
  return combineReducers({
    login,
  });
}
