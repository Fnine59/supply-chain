import { message } from 'antd';
import request from '../../common/utils/request';
import {
  GETDISPATCHORDERLIST,
} from './types';

/**
 * 获取配送单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/hq/dispatch/getList',
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
        type: GETDISPATCHORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'hqDispatch/updateState',
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
 * 获取配送单详情
 */
export function doGetDetail(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/hq/dispatch/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
        purchaseOrderNo: payload.purchaseOrderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'hqDispatch/updateState',
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

/**
 * 更新配送单信息
 */
export function doUpdate(payload) {
  console.log('payload', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/hq/dispatch/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'hqDispatch/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 配送总金额
            storeName: '', // 门店信息
          },
          delIds: [],
        },
      });
      dispatch(getList());
    }
  };
}
