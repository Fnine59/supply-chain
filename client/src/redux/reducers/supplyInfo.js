import { UPDATESTATE, GETSUPPLYLIST, GETSTATE } from '../actions/types';

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
    type: '',
  },
};

export default function supplyInfo(state = initState, action) {
  switch (action.type) {
    case GETSUPPLYLIST:
      console.log('======================获取到供应商列表======================');
      return { ...state, dataList: action.payload };
    case `supplyInfo/${GETSTATE}`:
      return { ...state };
    case `supplyInfo/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
