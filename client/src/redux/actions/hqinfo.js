import { message } from 'antd';
import request from '../../common/utils/request';
import { GETHQLIST } from './types';

/**
 * 获取配送中心列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/hqinfo/getList',
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
        type: GETHQLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'hqinfo/updateState',
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
 * 新增配送中心
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/hqinfo/create',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'hqinfo/updateState',
        payload: {
          modalVisible: false,
        },
      });
      dispatch(getList());
    }
  };
}

/**
 * 启用配送中心
 */
export function doEnable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/hqinfo/enable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'hqinfo/updateState',
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
 * 停用配送中心
 */
export function doDisable(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/hqinfo/disable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'hqinfo/updateState',
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
 * 删除配送中心
 */
export function doDelete(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/hqinfo/delete',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'hqinfo/updateState',
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
 * 更新配送中心信息
 */
export function doUpdate(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/hqinfo/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: 'hqinfo/updateState',
        payload: {
          modalVisible: false,
          currentItem: {},
        },
      });
      dispatch(getList());
    }
  };
}
