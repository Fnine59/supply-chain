import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../../redux/actions/shopinfo';

const ShopInfo = ({ shopinfo, dispatch }) => {
  console.log('shopinfo');
  return (
    <div className="shopinfo">
      mendianxinxi
    </div>
  );
};

function mapStateToProps(state) {
  return {
    shopinfo: state.shopinfo,
  };
}

ShopInfo.propTypes = {
  shopinfo: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(ShopInfo);
