import { UPDATESTATE, GETSHOPLIST, GETSTATE } from '../actions/types';

const initState = {
  modalVisible: false,
  currentItem: {}, // 当前编辑想
  dataList: [],
  selectKeys: [], // 选中行id
  selectItems: [], // 选中行内容
  queryParams: {
    page: 1,
    rows: 10,
    name: '',
    status: '',
  },
};

export default function shopinfo(state = initState, action) {
  switch (action.type) {
    case GETSHOPLIST:
      console.log('======================获取到门店列表======================');
      return { ...state, dataList: action.payload };
    case `shopinfo/${GETSTATE}`:
      return { ...state };
    case `shopinfo/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
