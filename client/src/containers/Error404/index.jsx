import React from 'react';
import { Empty, Button } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

const Error404 = ({ history }) => (
  <div className="error404">
    <Empty
      className="empty"
      image={
        <img
          alt="404 NOT FOUND"
          src="http://ww1.sinaimg.cn/large/006gU7ahly1g04lpvhtyxj30ia0dqadt.jpg"
          className="image"
        />
      }
      description={<span className="desc">404 NOT FOUND</span>}
    >
      <Button
        type="ghost"
        size="large"
        className="btn"
        onClick={() => {
          history.replace('/login');
        }}
      >
        去登录
      </Button>
    </Empty>
  </div>
);

Error404.propTypes = {
  history: PropTypes.object,
};

module.exports = Error404;
