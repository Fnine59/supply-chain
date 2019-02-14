import { message } from 'antd';
import request from '../../common/utils/request';
import history from '../../common/utils/history';
import { GETSHOPLIST, UPDSHOPINFO } from './types';

/**
 * 获取门店列表
 */
export function getList(paylaod) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/getShopList',
      method: 'post',
      data: paylaod,
    });
    if (res) {
      dispatch({
        type: GETSHOPLIST,
        payload: res,
      });
    }
  };
}

/**
 * 新增门店
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/createShop',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'shopinfo/updateState',
        payload: {
          modalVisible: false,
        },
      });
    }
  };
}

/**
 * 更新门店信息
 */
export function doUpdShop(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/login',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: UPDSHOPINFO,
        payload: res,
      });
      history.push('/index');
    }
  };
}
