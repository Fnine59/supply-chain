import { UPDATESTATE, GETHQLIST, GETSTATE } from '../actions/types';

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

export default function hqinfo(state = initState, action) {
  switch (action.type) {
    case GETHQLIST:
      console.log('======================获取到配送中心列表======================');
      return { ...state, dataList: action.payload };
    case `hqinfo/${GETSTATE}`:
      return { ...state };
    case `hqinfo/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
