import { UPDATESTATE, GETGOODSLIST, GETSTATE } from '../actions/types';

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

export default function goodsInfo(state = initState, action) {
  switch (action.type) {
    case GETGOODSLIST:
      console.log('======================获取到物品列表======================');
      return { ...state, dataList: action.payload };
    case `goodsInfo/${GETSTATE}`:
      return { ...state };
    case `goodsInfo/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
