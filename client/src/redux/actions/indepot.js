import request from '../../common/utils/request';
import {
  GETSHOPINDEPOTORDERLIST,
  GETSHOPINDEPOTSHOPLIST,
} from './types';

/**
 * 获取入库单列表
 */
export function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/indepot/getList',
      method: 'post',
      data: payload || {
        page: 1,
        rows: 10,
        orderNo: '',
        status: '',
        storeId: '',
      },
    });
    if (res) {
      dispatch({
        type: GETSHOPINDEPOTORDERLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'indepot/updateState',
          payload: {
            queryParams: {
              page: 1,
              rows: 10,
              name: '',
              status: '',
              storeId: '',
            },
          },
        });
      }
    }
  };
}

/**
 * 获取入库单详情
 */
export function doGetDetail(payload) {
  console.warn('getDetail', payload);
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/indepot/getDetail',
      method: 'post',
      data: {
        orderNo: payload.orderNo,
        selfPurchaseOrderNo: payload.selfPurchaseOrderNo,
      },
    });
    if (res) {
      dispatch({
        type: 'indepot/updateState',
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
 * 获取门店列表
 */
export function getShopList() {
  return async (dispatch) => {
    const res = await request({
      // TODO: 业务模块中使用门店列表的接口可以是同一个，后期合并
      url: '/api/shop/purchase/getShopList',
      method: 'get',
    });
    if (res) {
      dispatch({
        type: GETSHOPINDEPOTSHOPLIST,
        payload: res,
      });
    }
  };
}
