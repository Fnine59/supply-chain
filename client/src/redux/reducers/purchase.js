import {
  UPDATESTATE,
  GETPURCHASEORDERLIST,
  GETPURCHASEGOODSLIST,
  GETSTATE,
  GETPURCHASESHOPLIST,
} from '../actions/types';

const initState = {
  modalVisible: false,
  formVisible: false,
  goodsModalVisible: false,
  selectGoodsKeys: [],
  selectGoodsItems: [],
  formDataList: [],
  currentItem: {}, // 当前编辑项
  dataList: [],
  goodsList: [],
  shopList: [],
  selectKeys: [], // 选中行id
  selectItems: [], // 选中行内容
  queryParams: {
    page: 1,
    rows: 10,
    name: '',
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
    case `purchase/${GETSTATE}`:
      return { ...state };
    case `purchase/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
