import { message } from 'antd';
import request from '../../common/utils/request';
import {
  GETPURCHASEACCEPTORDERLIST,
} from './types';

/**
 * 获取验收单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchaseAccept/getList',
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
        type: GETPURCHASEACCEPTORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'selfPurchaseAccept/updateState',
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
 * 获取验收单详情
 */
export function doGetDetail(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchaseAccept/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'selfPurchaseAccept/updateState',
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
 * 更新验收单信息
 */
export function doUpdate(payload) {
  console.log('payload', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchaseAccept/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'selfPurchaseAccept/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 验收总金额
            storeName: '', // 门店信息
          },
          delIds: [],
        },
      });
      dispatch(getList());
    }
  };
}
