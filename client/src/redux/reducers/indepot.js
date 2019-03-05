import {
  UPDATESTATE,
  GETSHOPINDEPOTORDERLIST,
  GETSTATE,
} from '../actions/types';

const initState = {
  type: 'edit',
  orderInfo: {
    amount: 0, // 入库总金额
    storeName: '', // 门店信息
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

export default function indepot(state = initState, action) {
  switch (action.type) {
    case GETSHOPINDEPOTORDERLIST:
      console.log(
        '======================获取到入库单列表======================',
      );
      return { ...state, dataList: action.payload };
    case `indepot/${GETSTATE}`:
      return { ...state };
    case `indepot/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
