import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import * as action from '../../../redux/actions/indepot';
import Search from './Search';
import List from './List';
import OrderForm from './OrderForm';

class Indepot extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, indepot } = this.props;
    const { queryParams } = indepot;
    dispatch(action.getList(queryParams));
    dispatch(action.getShopList());
  }
  render() {
    const {
      type,
      formVisible,
      orderInfo,
      formDataList,
      dataList,
      shopList,
    } = this.props.indepot;
    const searchProps = {
      shopList,
      onClear: () => {
        const { dispatch } = this.props;
        dispatch(action.getList());
      },
      onSearch: (props) => {
        const { dispatch, indepot } = this.props;
        const { queryParams } = indepot;
        dispatch({
          type: 'indepot/updateState',
          payload: {
            queryParams: {
              ...queryParams,
              ...props,
            },
          },
        });
        dispatch(
          action.getList({
            ...queryParams,
            ...props,
          }),
        );
      },
    };
    const listProps = {
      dataSource: dataList,
      onView: (record) => {
        const { dispatch } = this.props;
        dispatch(
          action.doGetDetail({
            orderNo: record.acceptOrderNo,
            type: 'view',
          }),
        );
      },
    };
    const formProps = {
      // OrderForm数据
      type,
      orderInfo,
      shopList,
      onBack: () => {
        this.props.dispatch({
          type: 'indepot/updateState',
          payload: {
            formVisible: false,
            formDataList: [],
            orderInfo: {
              amount: 0, // 入库总金额
              storeName: '', // 门店信息
            },
          },
        });
      },
      // OrderForm中的表格数据
      tableProps: {
        dataSource: formDataList,
      },
    };
    return (
      <div className="indepot">
        {!formVisible && <Search {...searchProps} />}
        {!formVisible && <List {...listProps} />}
        {formVisible && <OrderForm {...formProps} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    indepot: state.indepot,
  };
}

Indepot.propTypes = {
  indepot: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Indepot);
