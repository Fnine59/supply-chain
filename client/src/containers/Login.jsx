import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../redux/actions/login';

const Login = ({ props, dispatch }) => {
  const list = {
    user: 'aasfdsfsdf',
  };
  const logi1n = () => {
    dispatch(login('ceshi payload'));
  };
  return (
    <div>
      login page!!!!
      {list.user}
      <button onClick={logi1n}>登录</button>
    </div>
  );
};

function mapStateToProps(props) {
  return { props };
}

Login.propTypes = {
  props: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Login);
