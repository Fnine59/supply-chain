import { message } from 'antd';
import request from '../../common/utils/request';
import { GETSUPPLYLIST } from './types';

/**
 * 获取供应商列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/supplyInfo/getList',
      method: 'post',
      data: payload || {
        page: 1,
        rows: 10,
        name: '',
        status: '',
        type: '',
      },
    });
    if (res) {
      dispatch({
        type: GETSUPPLYLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'supplyInfo/updateState',
          payload: {
            queryParams: {
              page: 1,
              rows: 10,
              name: '',
              status: '',
              type: '',
            },
          },
        });
      }
    }
  };
}

/**
 * 新增供应商
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/supplyInfo/create',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'supplyInfo/updateState',
        payload: {
          modalVisible: false,
        },
      });
      dispatch(getList());
    }
  };
}

/**
 * 启用供应商
 */
export function doEnable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/supplyInfo/enable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'supplyInfo/updateState',
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
 * 停用供应商
 */
export function doDisable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/supplyInfo/disable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'supplyInfo/updateState',
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
 * 删除供应商
 */
export function doDelete(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/supplyInfo/delete',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'supplyInfo/updateState',
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
 * 更新供应商信息
 */
export function doUpdate(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/supplyInfo/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: 'supplyInfo/updateState',
        payload: {
          modalVisible: false,
          currentItem: {},
        },
      });
      dispatch(getList());
    }
  };
}
