import {
  UPDATESTATE,
  GETGOODSDEPOTLIST,
  GETGOODSDEPOTSHOPLIST,
  GETSTATE,
} from '../actions/types';

const initState = {
  dataList: [],
  shopList: [],
  queryParams: {
    page: 1,
    rows: 10,
    name: '',
    status: '',
    storeId: '',
  },
};

export default function depot(state = initState, action) {
  switch (action.type) {
    case GETGOODSDEPOTLIST:
      console.log('======================获取到物品列表======================');
      return { ...state, dataList: action.payload };
    case GETGOODSDEPOTSHOPLIST:
      console.log('======================获取到门店列表======================');
      return { ...state, shopList: action.payload };
    case `depot/${GETSTATE}`:
      return { ...state };
    case `depot/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
