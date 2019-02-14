import { message } from 'antd';
import request from '../../common/utils/request';
import history from '../../common/utils/history';
import { LOGIN, REGISTER } from './types';

export function login(payload) {
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
      history.push('/error404');
    }
  };
}

export function register(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/register',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: REGISTER,
        payload: res,
      });
      console.log(res);
      message.success(res.message, 2);
    }
  };
}
