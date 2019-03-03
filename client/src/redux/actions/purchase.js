import { message } from 'antd';
import request from '../../common/utils/request';
import { GETPURCHASEORDERLIST, GETPURCHASEGOODSLIST, GETPURCHASESHOPLIST } from './types';

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
          amount: 0, // 请购总金额
        },
      });
      dispatch(getList());
    }
  };
}

/**
 * 启用请购单
 */
export function doEnable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/enable',
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
 * 停用请购单
 */
export function doDisable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/purchase/disable',
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
 * 更新请购单信息
 */
export function doUpdate(payload) {
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
          modalVisible: false,
          currentItem: {},
        },
      });
      dispatch(getList());
    }
  };
}
