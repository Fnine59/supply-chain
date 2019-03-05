import {
  UPDATESTATE,
  GETSELFPURCHASEACCEPTORDERLIST,
  GETSTATE,
} from '../actions/types';

const initState = {
  type: 'edit',
  orderInfo: {
    amount: 0, // 验收总金额
    storeName: '', // 门店信息
    diffAmount: 0, // 验收差异总金额
  },
  formVisible: false,
  goodsModalVisible: false,
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

export default function selfPurchaseAccept(state = initState, action) {
  switch (action.type) {
    case GETSELFPURCHASEACCEPTORDERLIST:
      console.log(
        '======================获取到验收单列表======================',
      );
      return { ...state, dataList: action.payload };
    case `selfPurchaseAccept/${GETSTATE}`:
      return { ...state };
    case `selfPurchaseAccept/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
