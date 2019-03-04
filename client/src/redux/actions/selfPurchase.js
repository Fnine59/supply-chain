import { message } from 'antd';
import request from '../../common/utils/request';
import {
  GETSELFPURCHASEORDERLIST,
  GETSELFPURCHASEGOODSLIST,
  GETSELFPURCHASESHOPLIST,
  GETSELFPURCHASESUPPLYLIST,
} from './types';

/**
 * 获取物品列表
 */
export function getGoodsList() {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/getGoodsList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETSELFPURCHASEGOODSLIST,
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
      url: '/api/shop/selfPurchase/getShopList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETSELFPURCHASESHOPLIST,
        payload: res,
      });
    }
  };
}

/**
 * 获取供应商列表
 */
export function getSupplyList() {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/getSupplyList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETSELFPURCHASESUPPLYLIST,
        payload: res,
      });
    }
  };
}

/**
 * 获取自采单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/getList',
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
        type: GETSELFPURCHASEORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'selfPurchase/updateState',
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
 * 获取自采单详情
 */
export function doGetDetail(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'selfPurchase/updateState',
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
 * 新增自采单
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/create',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'selfPurchase/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 自采总金额
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
 * 删除自采单
 */
export function doDelete(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/delete',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'selfPurchase/updateState',
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
 * 撤回自采单
 */
export function doWithdraw(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/withdraw',
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
 * 更新自采单信息
 */
export function doUpdate(payload) {
  console.log('payload', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/selfPurchase/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: 'selfPurchase/updateState',
        payload: {
          formVisible: false,
          selectGoodsKeys: [],
          selectGoodsItems: [],
          formDataList: [],
          orderInfo: {
            amount: 0, // 自采总金额
            storeName: '', // 门店信息
          },
          delIds: [],
        },
      });
      dispatch(getList());
    }
  };
}
