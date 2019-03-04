import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import * as action from '../../../redux/actions/sendGoods';
import Search from './Search';
import List from './List';
import OrderForm from './OrderForm';

class Purchase extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, sendGoods } = this.props;
    const { queryParams } = sendGoods;
    dispatch(action.getList(queryParams));
  }
  render() {
    const {
      type,
      delIds,
      goodsModalVisible,
      formVisible,
      orderInfo,
      selectGoodsKeys,
      selectGoodsItems,
      formDataList,
      dataList,
      goodsList,
      shopList,
    } = this.props.sendGoods;
    const searchProps = {
      onClear: () => {
        const { dispatch } = this.props;
        dispatch(action.getList());
      },
      onSearch: (props) => {
        const { dispatch, sendGoods } = this.props;
        const { queryParams } = sendGoods;
        dispatch({
          type: 'sendGoods/updateState',
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
      onSubmit: (id) => {
        if (formDataList.length === 0) {
          message.error('发货的物品列表不能为空');
          return;
        }
        const params = {
          goodsList: formDataList,
          storeId: id,
          amount: orderInfo.amount,
        };
        this.props.dispatch(action.doAdd(params));
      },
      onUpdate: () => {
        if (formDataList.length === 0) {
          message.error('发货的物品列表不能为空');
          return;
        }
        const params = {
          goodsList: formDataList,
          orderNo: orderInfo.orderNo,
          amount: orderInfo.amount,
          delIds,
        };
        this.props.dispatch(action.doUpdate(params));
      },
      onBack: () => {
        this.props.dispatch({
          type: 'sendGoods/updateState',
          payload: {
            formVisible: false,
            selectGoodsKeys: [],
            selectGoodsItems: [],
            formDataList: [],
            orderInfo: {
              amount: 0, // 发货总金额
              storeName: '', // 门店信息
            },
            delIds: [],
          },
        });
      },
      // OrderForm中的弹窗数据
      modalProps: {
        visible: goodsModalVisible,
        title: '添加物品',
        goodsList,
        selectGoodsKeys,
        onSelect: (keys, items) => {
          this.props.dispatch({
            type: 'sendGoods/updateState',
            payload: {
              selectGoodsKeys: keys,
              selectGoodsItems: items,
            },
          });
        },
        onClose: (t) => {
          if (t) {
            this.props.dispatch({
              type: 'sendGoods/updateState',
              payload: {
                goodsModalVisible: false,
              },
            });
            return;
          }
          const newList = [];
          selectGoodsItems.forEach((s) => {
            let flag = true;
            formDataList.forEach((d) => {
              if (d.id === s.id) {
                flag = false;
                newList.push(d);
              }
            });
            if (flag) {
              newList.push(s);
            }
          });
          this.props.dispatch({
            type: 'sendGoods/updateState',
            payload: {
              formDataList: newList,
              goodsModalVisible: false,
            },
          });
        },
      },
      // OrderForm中的表格数据
      tableProps: {
        dataSource: formDataList,
        selectGoodsKeys,
        selectGoodsItems,
        onSetDataSource: (newDataList) => {
          console.warn('newDataList', newDataList);
          let money = 0;
          let diffMoney = 0;
          newDataList.forEach((d) => {
            money += d.dispatchGoodsAmount;
            diffMoney += d.dispatchGoodsDiffAmount;
          });
          console.warn('money', money);
          this.props.dispatch({
            type: 'sendGoods/updateState',
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
            type: 'sendGoods/updateState',
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
                type: 'sendGoods/updateState',
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
      <div className="sendGoods">
        {!formVisible && <Search {...searchProps} />}
        {!formVisible && <List {...listProps} />}
        {formVisible && <OrderForm {...formProps} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sendGoods: state.sendGoods,
  };
}

Purchase.propTypes = {
  sendGoods: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Purchase);
