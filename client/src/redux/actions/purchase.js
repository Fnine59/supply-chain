import { message } from 'antd';
import request from '../../common/utils/request';
import {
  GETPURCHASEORDERLIST,
  GETPURCHASEGOODSLIST,
  GETPURCHASESHOPLIST,
} from './types';

/**
 * 获取物品列表
 */
export function getGoodsList() {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/getGoodsList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETPURCHASEGOODSLIST,
        payload: res.map(item => ({
          ...item,
          goodsCount: 0,
          goodsAmount: 0,
        })),
      });
    }
  };
}

/**
 * 获取门店列表
 */
export function getShopList() {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/getShopList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETPURCHASESHOPLIST,
        payload: res,
      });
    }
  };
}

/**
 * 获取请购单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/getList',
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
        type: GETPURCHASEORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'purchase/updateState',
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
 * 获取请购单详情
 */
export function doGetDetail(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'purchase/updateState',
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
 * 新增请购单
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/create',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'purchase/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 请购总金额
            storeName: '', // 门店信息
          },
          delIds: [],
        },
      });
      dispatch(getList());
    }
  };
}

/**
 * 删除请购单
 */
export function doDelete(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/delete',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'purchase/updateState',
        payload: {
          selectKeys: [],
          selectItems: [],
        },
      });
      dispatch(getList());
    }
  };
}

/**
 * 撤回请购单
 */
export function doWithdraw(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/withdraw',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch(getList());
    }
  };
}


/**
 * 更新请购单信息
 */
export function doUpdate(payload) {
  console.log('payload', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: 'purchase/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 请购总金额
            storeName: '', // 门店信息
          },
          delIds: [],
        },
      });
      dispatch(getList());
    }
  };
}
