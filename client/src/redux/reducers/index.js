// import { combineReducers } from 'redux-immutable';

// const appReducer = combineReducers({

// });

// const Reducer = (state, action) => {
//   if (action.type === 'logout') {
//     // history.push('/login');
//     window.localStorage.clear();
//     // state = undefined;
//   }
//   return appReducer(state, action);
// };

// export default Reducer;

import { combineReducers } from 'redux';

export default function createReducer(asyncReducers) {
  const reducer = {
    ...asyncReducers,
  };
  return combineReducers(reducer);
}
