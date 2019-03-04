import { message } from 'antd';
import request from '../../common/utils/request';
import {
  GETSENDGOODSORDERLIST,
} from './types';

/**
 * 获取发货单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/supply/sendGoods/getList',
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
        type: GETSENDGOODSORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'sendGoods/updateState',
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
 * 获取发货单详情
 */
export function doGetDetail(payload) {
  console.warn('getDetail', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/supply/sendGoods/getDetail',
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

/**
 * 更新发货单信息
 */
export function doUpdate(payload) {
  console.log('payload', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/supply/sendGoods/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'sendGoods/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 发货总金额
            storeName: '', // 门店信息
          },
          delIds: [],
        },
      });
      dispatch(getList());
    }
  };
}
