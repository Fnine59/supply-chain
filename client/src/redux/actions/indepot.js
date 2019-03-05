import request from '../../common/utils/request';
import {
  GETSHOPINDEPOTORDERLIST,
} from './types';

/**
 * 获取入库单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/indepot/getList',
      method: 'post',
      data: payload || {
        page: 1,
        rows: 10,
        orderNo: '',
        status: '',
      },
    });
    if (res) {
      dispatch({
        type: GETSHOPINDEPOTORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'indepot/updateState',
          payload: {
            queryParams: {
              page: 1,
              rows: 10,
              name: '',
              status: '',
            },
          },
        });
      }
    }
  };
}

/**
 * 获取入库单详情
 */
export function doGetDetail(payload) {
  console.warn('getDetail', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/indepot/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
        selfPurchaseOrderNo: payload.selfPurchaseOrderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'indepot/updateState',
        payload: {
          type: payload.type,
          formVisible: true,
          orderInfo: res,
          formDataList: res.goodsList,
          selectGoodsKeys: res.goodsList.map(it => it.id),
          selectGoodsItems: res.goodsList.map(it => it),
        },
      });
    }
  };
}
