/* global fetch */
import { message } from 'antd';

const request = (option) => {
  console.log('222', option);
  return fetch(option.url, {
    method: option.method || 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(option.data),
  })
        .then(response => response.json())
        .then((res) => {
          console.log('resssss', res);
          return res;
        })
        .catch((err) => {
          console.error('fetch error =====>', err);
          message.error('网络请求失败', 2);
          return null;
        });
};

export default request;
