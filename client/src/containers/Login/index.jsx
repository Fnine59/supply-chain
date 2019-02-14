import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../redux/actions/login';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const Login = ({ login, dispatch }) => {
  const { userInfo, loginFlag, registerFlag } = login;

  const loginProps = {
    onLogin: (user) => {
      dispatch(action.login(user));
    },
    onRegister: () => {
      dispatch({
        type: 'login/updateState',
        payload: {
          loginFlag: false,
          registerFlag: true,
        },
      });
    },
  };

  const registerProps = {
    onRegister: (user) => {
      dispatch(action.register(user));
    },
    onLogin: () => {
      dispatch({
        type: 'login/updateState',
        payload: {
          loginFlag: true,
          registerFlag: false,
        },
      });
    },
  };

  return (
    <div className="login">
      {loginFlag && <LoginForm {...loginProps} />}
      {registerFlag && <RegisterForm {...registerProps} />}
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
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Login);
