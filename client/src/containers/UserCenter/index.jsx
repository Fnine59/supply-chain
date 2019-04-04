import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../redux/actions/userCenter';
import ChangeForm from './ChangeForm';

import './index.less';

const UserCenter = ({ userCenter, dispatch }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const formProps = {
    userInfo,
    onModify: (user) => {
      dispatch(action.modify(user));
    },
  };

  return (
    <div className="userCenter">
      <ChangeForm {...formProps} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userCenter: state.userCenter,
  };
}

UserCenter.propTypes = {
  userCenter: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(UserCenter);
