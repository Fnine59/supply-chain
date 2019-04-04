import { message } from 'antd';
import request from '../../common/utils/request';
import { LOGIN, REGISTER, LOGOUT, CHANGEPASS } from './types';

export function modify(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/modify',
      method: 'post',
      data: payload,
    });
    console.warn('res', res);
    if (res) {
      dispatch({
        type: LOGIN,
        payload: res,
      });
      localStorage.setItem('userInfo', JSON.stringify({
        id: payload.id,
        username: payload.username,
        password: payload.password,
        nickname: payload.nickname,
      }));
      message.success(res.message, 2);
    }
  };
}
