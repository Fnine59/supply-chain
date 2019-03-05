import { UPDATESTATE, GETGOODSDEPOTLIST, GETSTATE } from '../actions/types';

const initState = {
  dataList: [],
  queryParams: {
    page: 1,
    rows: 10,
    name: '',
    status: '',
  },
};

export default function depot(state = initState, action) {
  switch (action.type) {
    case GETGOODSDEPOTLIST:
      console.log('======================获取到物品列表======================');
      return { ...state, dataList: action.payload };
    case `depot/${GETSTATE}`:
      return { ...state };
    case `depot/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.warn('未匹配到相应的ACTION TYPE');
      return { ...state };
  }
}
