import { REGISTER, LOGIN, UPDATESTATE } from '../actions/types';

const initState = {
  userInfo: {},
};

export default function login(state = initState, action) {
  switch (action.type) {
    case REGISTER:
      console.log('注册！');
      return { ...state };
    case LOGIN:
      console.log('======================登录======================');
      console.log('login action.payload', action.payload);
      return { ...state, userInfo: action.payload };
    case `login/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.log('Default');
      return { ...state };
  }
}
