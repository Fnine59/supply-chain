import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Routes from './routes';
import createReducer from './redux/reducers';

const store = createStore(createReducer);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
, document.getElementById('app'));
