import { LOGIN, REGISTER } from './types';

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function register(payload) {
  return {
    type: REGISTER,
    payload: payload.payload,
  };
}
