import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../redux/actions/login';
import { updateState } from '../redux/actions/common';
import LoginForm from '../components/Login/LoginForm';

const Login = ({ login, dispatch }) => {
  const {
    username,
    password,
  } = login;

  const doLogin = () => {
    dispatch(action.login('ceshi payload'));
  };

  return (
    <div>
      <LoginForm />
    </div>
  );
};

function mapStateToProps(state) {
  console.warn(state);
  return {
    login: state.login,
  };
}

Login.propTypes = {
  login: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Login);
