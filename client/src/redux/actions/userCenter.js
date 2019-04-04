import { message } from 'antd';
import request from '../../common/utils/request';
import history from '../../common/utils/history';
import { LOGIN, REGISTER, LOGOUT, CHANGEPASS } from './types';

export function changeUser(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/modifyUser',
      method: 'post',
      data: payload,
    });
  };
}

// export function login(payload) {
//   return async (dispatch) => {
//     const res = await request({
//       url: '/api/login',
//       method: 'post',
//       data: payload,
//     });
//     if (res) {
//       dispatch({
//         type: LOGIN,
//         payload: res,
//       });
//       localStorage.setItem('userInfo', JSON.stringify(res));
//       history.push('/index');
//     }
//   };
// }

// export function register(payload) {
//   return async (dispatch) => {
//     const res = await request({
//       url: '/api/register',
//       method: 'post',
//       data: payload,
//     });
//     if (res) {
//       dispatch({
//         type: REGISTER,
//         payload: res,
//       });
//       console.log(res);
//       message.success(res.message, 2);
//     }
//   };
// }

// export function logout() {
//   localStorage.removeItem('userInfo');
//   // TODO: 后期想办法清空页面栈
//   history.push('/login');
//   return {
//     type: LOGOUT,
//   };
// }
