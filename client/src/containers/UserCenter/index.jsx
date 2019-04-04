import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../redux/actions/login';
import changeForm from './changeForm';

import './index.less';

const UserCenter = ({ login, dispatch }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

  const loginProps = {
    userInfo,
    onLogin: (user) => {
      dispatch(action.login(user));
    },
  };

  return (
    <div className="userCenter">
      <changeForm {...loginProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

UserCenter.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(UserCenter);
