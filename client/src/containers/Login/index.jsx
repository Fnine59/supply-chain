import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../redux/actions/login';
import LoginForm from './LoginForm';

const Login = ({ login, history, dispatch }) => {
  const { username, password } = login;

  const doLogin = (payload) => {
    dispatch(action.login(payload));
  };

  const loginProps = {
    onLogin: (userInfo) => {
      doLogin(userInfo);
    },
    onRegister: () => {
      history.push('/error404');
    },
  };

  return (
    <div className="login">
      <LoginForm {...loginProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

Login.propTypes = {
  login: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Login);
