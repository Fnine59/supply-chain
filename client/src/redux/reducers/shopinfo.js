import { UPDATESTATE, GETSHOPLIST, UPDSHOPINFO } from '../actions/types';

const initState = {
  modalVisible: false,
  dataList: [],
  queryParams: {
    page: 1,
    rows: 10,
  },
};

export default function shopinfo(state = initState, action) {
  switch (action.type) {
    case GETSHOPLIST:
      console.log('======================获取到门店列表======================');
      return { ...state, dataList: action.payload };
    case UPDSHOPINFO:
      console.log('======================登录======================');
      return { ...state, userInfo: action.payload };
    case `shopinfo/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
