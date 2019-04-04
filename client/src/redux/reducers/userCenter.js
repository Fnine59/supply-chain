import { REGISTER, LOGIN, UPDATESTATE, LOGOUT } from '../actions/types';

const initState = {
  userInfo: {},
  loginFlag: true,
  registerFlag: false,
};

export default function login(state = initState, action) {
  switch (action.type) {
    case REGISTER:
      console.log('======================注册！======================');
      return { ...state, registerFlag: false, loginFlag: true };
    case LOGIN:
      console.log('======================登录======================');
      return { ...state, userInfo: action.payload };
    case LOGOUT:
      console.log('======================退出登录======================');
      return { ...state, userInfo: {} };
    case `userCenter/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
