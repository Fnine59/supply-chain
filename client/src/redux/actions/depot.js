import request from '../../common/utils/request';
import { GETGOODSDEPOTLIST } from './types';

/**
 * 获取入库流水列表
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
            },
          },
        });
      }
    }
  };
}

/**
 * 获取入库流水详情
 */
export function doGetDetail(payload) {
  console.warn('getDetail', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/depot/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
        selfPurchaseOrderNo: payload.selfPurchaseOrderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'sendGoods/updateState',
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
