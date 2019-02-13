import request from '../../common/utils/request';
import { LOGIN, REGISTER } from './types';

export function login(payload) {
  return async (dispatch) => {
    console.log('action payload', payload);
    const res = await request({
      url: '/api/login',
      method: 'post',
      data: payload,
    });
    console.log('res', res);
    dispatch({
      type: LOGIN,
      payload,
    });
  };
}

export function register(payload) {
  return {
    type: REGISTER,
    payload: payload.payload,
  };
}
