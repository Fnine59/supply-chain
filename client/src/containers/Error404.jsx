import React from 'react';
import { Empty, Button } from 'antd';

const Error404 = () => (
  <Empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    description={
      <span>
        页面走丢啦
      </span>
    }
  >
    <Button type="primary">立即创建</Button>
  </Empty>
);

module.exports = Error404;
