import { message } from 'antd';
import request from '../../common/utils/request';
import { GETGOODSLIST } from './types';

/**
 * 获取供应商列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/goodsInfo/getList',
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
        type: GETGOODSLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'goodsInfo/updateState',
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
 * 新增供应商
 */
export function doAdd(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/baseinfo/goodsInfo/create',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'goodsInfo/updateState',
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
      url: '/api/baseinfo/goodsInfo/enable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'goodsInfo/updateState',
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
      url: '/api/baseinfo/goodsInfo/disable',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'goodsInfo/updateState',
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
      url: '/api/baseinfo/goodsInfo/delete',
      method: 'post',
      data: payload,
    });
    if (res) {
      message.success(res.message, 2);
      dispatch({
        type: 'goodsInfo/updateState',
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
      url: '/api/baseinfo/goodsInfo/update',
      method: 'post',
      data: payload,
    });
    if (res) {
      dispatch({
        type: 'goodsInfo/updateState',
        payload: {
          modalVisible: false,
          currentItem: {},
        },
      });
      dispatch(getList());
    }
  };
}
