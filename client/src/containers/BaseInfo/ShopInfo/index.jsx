import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../../redux/actions/shopinfo';
import Search from './Search';
import List from './List';
import Modal from './Modal';

class ShopInfo extends React.PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }
  componentDidMount() {
    const { dispatch, shopinfo } = this.props;
    const { queryParams } = shopinfo;
    dispatch(action.getList(queryParams));
  }
  render() {
    const { modalVisible, dataList } = this.props.shopinfo;
    const searchProps = {
      onAdd: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'shopinfo/updateState',
          payload: {
            modalVisible: true,
          },
        });
      },
    };
    const modalProps = {
      title: '新增门店',
      visible: modalVisible,
      onSubmit: (data) => {
        this.props.dispatch(action.doAdd({ ...data, status: true }));
      },
      onCancel: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'shopinfo/updateState',
          payload: {
            modalVisible: false,
          },
        });
      },
    };
    return (
      <div className="shopinfo">
        <Search {...searchProps} />
        <List dataSource={dataList} />
        <Modal {...modalProps} />
      </div>
    );
  }
}

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
