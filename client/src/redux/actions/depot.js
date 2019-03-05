import request from '../../common/utils/request';
import { GETGOODSDEPOTLIST, GETGOODSDEPOTSHOPLIST } from './types';

/**
 * 获取物品库存列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/depot/getList',
      method: 'post',
      data: payload || {
        page: 1,
        rows: 10,
        name: '',
        status: '',
        storeId: '',
      },
    });
    if (res) {
      dispatch({
        type: GETGOODSDEPOTLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'depot/updateState',
          payload: {
            queryParams: {
              page: 1,
              rows: 10,
              name: '',
              status: '',
              storeId: '',
            },
          },
        });
      }
    }
  };
}

/**
 * 获取门店列表
 */
export function getShopList() {
  return async (dispatch) => {
    const res = await request({
      // TODO: 业务模块中使用门店列表的接口可以是同一个，后期合并
      url: '/api/shop/purchase/getShopList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETGOODSDEPOTSHOPLIST,
        payload: res,
      });
    }
  };
}
