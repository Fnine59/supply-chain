import {
  UPDATESTATE,
  GETSTATE,
  GETPURCHASEORDERLIST,
  GETPURCHASEGOODSLIST,
  GETPURCHASESHOPLIST,
  GETPURCHASEDISPATCHLIST,
} from '../actions/types';

const initState = {
  type: 'edit',
  orderInfo: {
    amount: 0, // 请购总金额
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
  dispatchList: [],
  queryParams: {
    page: 1,
    rows: 10,
    orderNo: '',
    status: '',
  },
};

export default function purchase(state = initState, action) {
  switch (action.type) {
    case GETPURCHASEORDERLIST:
      console.log(
        '======================获取到请购单列表======================',
      );
      return { ...state, dataList: action.payload };
    case GETPURCHASEGOODSLIST:
      console.log('======================获取到物品列表======================');
      return { ...state, goodsList: action.payload };
    case GETPURCHASESHOPLIST:
      console.log('======================获取到门店列表======================');
      return { ...state, shopList: action.payload };
    case GETPURCHASEDISPATCHLIST:
      console.log('======================获取到配送中心列表======================');
      return { ...state, dispatchList: action.payload };
    case `purchase/${GETSTATE}`:
      return { ...state };
    case `purchase/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
