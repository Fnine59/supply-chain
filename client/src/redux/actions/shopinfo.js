import { message } from 'antd';
import request from '../../common/utils/request';
import { GETSHOPLIST } from './types';

/**
 * 获取门店列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/getList',
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
        type: GETSHOPLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'shopinfo/updateState',
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
 * 新增门店
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/create',
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
      dispatch(getList());
    }
  };
}

/**
 * 启用门店
 */
export function doEnable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/enable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'shopinfo/updateState',
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
 * 停用门店
 */
export function doDisable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/disable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'shopinfo/updateState',
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
 * 删除门店
 */
export function doDelete(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/delete',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'shopinfo/updateState',
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
 * 更新门店信息
 */
export function doUpdate(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: 'shopinfo/updateState',
        payload: {
          modalVisible: false,
          currentItem: {},
        },
      });
      dispatch(getList());
    }
  };
}
