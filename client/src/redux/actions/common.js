import { CLEARSTATE, UPDATESTATE } from './types';

export function updateState(namespace, payload) {
  return {
    type: `${namespace}/${UPDATESTATE}`,
    payload,
  };
}

export function clearState(namespace, params) {
  return {
    type: `${namespace}/${CLEARSTATE}`,
  };
}
