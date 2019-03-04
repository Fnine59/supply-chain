import {
  UPDATESTATE,
  GETDISPATCHORDERLIST,
  GETSTATE,
} from '../actions/types';

const initState = {
  type: 'edit',
  orderInfo: {
    amount: 0, // 配送总金额
    storeName: '', // 门店信息
    diffAmount: 0, // 配送差异总金额
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

export default function hqDispatch(state = initState, action) {
  switch (action.type) {
    case GETDISPATCHORDERLIST:
      console.log(
        '======================获取到配送单列表======================',
      );
      return { ...state, dataList: action.payload };
    case `hqDispatch/${GETSTATE}`:
      return { ...state };
    case `hqDispatch/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
