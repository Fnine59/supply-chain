import { LOGIN } from './types';

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}
