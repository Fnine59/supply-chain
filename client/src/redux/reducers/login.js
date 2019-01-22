import { REGISTER, LOGIN, UPDATESTATE } from '../actions/types';

const initState = {
};

export default function login(state = initState, action) {
  switch (action.type) {
    case REGISTER:
      console.log('注册！');
      return { ...state };
    case LOGIN:
      console.log('denglu !');
      return { ...state };
    case `login/${UPDATESTATE}`:
      return { ...state, ...action.payload };
    default:
      console.log('Default');
      return { ...state };
  }
}
