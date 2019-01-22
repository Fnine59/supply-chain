import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createReducer from '../reducers/index';


const middlewares = [
  thunkMiddleware,
  createLogger(),
];

export default function configureStore() {
  const store = createStore(createReducer(), applyMiddleware(...middlewares));
  return store;
}
