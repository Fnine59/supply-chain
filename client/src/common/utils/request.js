/* global fetch */
import { message } from 'antd';

const request = option => fetch(option.url, {
  method: option.method || 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(option.data),
})
        .then(response => response.json())
        .then((res) => {
          if (res.code === 200 && res.success) {
            return res.data || res;
          }
          message.error(res.message, 2);
          return null;
        })
        .catch((err) => {
          console.error('fetch error =====>', err);
          message.error('网络请求失败', 2);
          return null;
        });

export default request;
