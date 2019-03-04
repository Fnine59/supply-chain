import {
  UPDATESTATE,
  GETSELFPURCHASEORDERLIST,
  GETSELFPURCHASEGOODSLIST,
  GETSELFPURCHASESHOPLIST,
  GETSTATE,
} from '../actions/types';

const initState = {
  type: 'edit',
  orderInfo: {
    amount: 0, // 自采总金额
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

export default function selfPurchase(state = initState, action) {
  switch (action.type) {
    case GETSELFPURCHASEORDERLIST:
      console.log(
        '======================获取到自采单列表======================',
      );
      return { ...state, dataList: action.payload };
    case GETSELFPURCHASEGOODSLIST:
      console.log('======================获取到物品列表======================');
      return { ...state, goodsList: action.payload };
    case GETSELFPURCHASESHOPLIST:
      console.log('======================获取到门店列表======================');
      return { ...state, shopList: action.payload };
    case `selfPurchase/${GETSTATE}`:
      return { ...state };
    case `selfPurchase/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
