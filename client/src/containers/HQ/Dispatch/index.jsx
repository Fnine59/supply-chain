import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../../redux/actions/hqDispatch';
import Search from './Search';
import List from './List';
import OrderForm from './OrderForm';

class Dispatch extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, hqDispatch } = this.props;
    const { queryParams } = hqDispatch;
    dispatch(action.getList(queryParams));
  }
  render() {
    const {
      type,
      delIds,
      formVisible,
      orderInfo,
      selectGoodsKeys,
      selectGoodsItems,
      formDataList,
      dataList,
      shopList,
    } = this.props.hqDispatch;
    const searchProps = {
      onClear: () => {
        const { dispatch } = this.props;
        dispatch(action.getList());
      },
      onSearch: (props) => {
        const { dispatch, hqDispatch } = this.props;
        const { queryParams } = hqDispatch;
        dispatch({
          type: 'hqDispatch/updateState',
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
            orderNo: record.orderNo,
            purchaseOrderNo: record.purchaseOrderNo,
            type: 'view',
          }),
        );
      },
      onUpdate: (record) => {
        this.props.dispatch(
          action.doGetDetail({
            orderNo: record.orderNo,
            purchaseOrderNo: record.purchaseOrderNo,
            type: 'edit',
          }),
        );
      },
    };
    const formProps = {
      // OrderForm数据
      type,
      orderInfo,
      shopList,
      onUpdate: () => {
        const params = {
          goodsList: formDataList,
          orderNo: orderInfo.orderNo,
          amount: orderInfo.amount,
          diffAmount: orderInfo.diffAmount,
          purchaseOrderNo: orderInfo.purchaseOrderNo,
        };
        this.props.dispatch(action.doUpdate(params));
      },
      onBack: () => {
        this.props.dispatch({
          type: 'hqDispatch/updateState',
          payload: {
            formVisible: false,
            formDataList: [],
            orderInfo: {
              amount: 0, // 配送总金额
              storeName: '', // 门店信息
            },
          },
        });
      },
      // OrderForm中的表格数据
      tableProps: {
        dataSource: formDataList,
        selectGoodsKeys,
        selectGoodsItems,
        onSetDataSource: (newDataList) => {
          let money = 0;
          let diffMoney = 0;
          newDataList.forEach((d) => {
            money += d.dispatchGoodsAmount;
            diffMoney += d.dispatchGoodsDiffAmount;
          });
          this.props.dispatch({
            type: 'hqDispatch/updateState',
            payload: {
              formDataList: newDataList,
              orderInfo: {
                ...orderInfo,
                amount: money,
                diffAmount: diffMoney,
              },
            },
          });
        },
        onSetSelectItems: (newKeys, newItems) => {
          this.props.dispatch({
            type: 'hqDispatch/updateState',
            payload: {
              selectGoodsKeys: newKeys,
              selectGoodsItems: newItems,
            },
          });
        },
        onDeleteGoods: (id) => {
          const { dispatch } = this.props;
          if (type === 'edit') {
            const item = formDataList.filter(it => it.id === id);
            if (item.length > 0) {
              const arr = delIds;
              item.forEach((it) => {
                if (it.detailId) {
                  arr.push(it.detailId);
                }
              });
              dispatch({
                type: 'hqDispatch/updateState',
                payload: {
                  delIds: arr,
                },
              });
            }
          }
        },
      },
    };
    return (
      <div className="hqDispatch">
        {!formVisible && <Search {...searchProps} />}
        {!formVisible && <List {...listProps} />}
        {formVisible && <OrderForm {...formProps} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hqDispatch: state.hqDispatch,
  };
}

Dispatch.propTypes = {
  hqDispatch: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Dispatch);
