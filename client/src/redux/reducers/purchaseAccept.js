import {
  UPDATESTATE,
  GETPURCHASEACCEPTORDERLIST,
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

export default function purchaseAccept(state = initState, action) {
  switch (action.type) {
    case GETPURCHASEACCEPTORDERLIST:
      console.log(
        '======================获取到验收单列表======================',
      );
      return { ...state, dataList: action.payload };
    case `purchaseAccept/${GETSTATE}`:
      return { ...state };
    case `purchaseAccept/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
