import request from '../../common/utils/request';
import { GETGOODSDEPOTLIST } from './types';

/**
 * 获取物品库存列表
 */
export default function getList(payload) {
  return async (dispatch) => {
    const res = await request({
      url: '/api/shop/depot/getList',
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
        type: GETGOODSDEPOTLIST,
        payload: res,
      });
      if (!payload) {
        dispatch({
          type: 'depot/updateState',
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
