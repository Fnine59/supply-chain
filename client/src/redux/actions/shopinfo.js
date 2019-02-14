import { message } from 'antd';
import request from '../../common/utils/request';
import history from '../../common/utils/history';
import { LOGIN, REGISTER, LOGOUT } from './types';

export function getShops(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/login',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: LOGIN,
        payload: res,
      });
      history.push('/index');
    }
  };
}

export function login1(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/login',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: LOGIN,
        payload: res,
      });
      history.push('/index');
    }
  };
}
