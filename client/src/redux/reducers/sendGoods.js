import {
  UPDATESTATE,
  GETSENDGOODSORDERLIST,
  GETSTATE,
} from '../actions/types';

const initState = {
  type: 'edit',
  orderInfo: {
    amount: 0, // 发货总金额
    storeName: '', // 门店信息
  },
  formVisible: false,
  goodsModalVisible: false,
  delIds: [], // 删除数组
  selectGoodsKeys: [],
  selectGoodsItems: [],
  formDataList: [],
  dataList: [],
  goodsList: [],
  shopList: [],
  queryParams: {
    page: 1,
    rows: 10,
    orderNo: '',
    status: '',
  },
};

export default function sendGoods(state = initState, action) {
  switch (action.type) {
    case GETSENDGOODSORDERLIST:
      console.log(
        '======================获取到发货单列表======================',
      );
      return { ...state, dataList: action.payload };
    case `sendGoods/${GETSTATE}`:
      return { ...state };
    case `sendGoods/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
