import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import configureStore from './redux/store/index';
import './index.less';

const store = configureStore();

window.baseUrl = 'http://localhost:8000/#';

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>
, document.getElementById('app'));
