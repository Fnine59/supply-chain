import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import * as action from '../../../redux/actions/purchase';
import Search from './Search';
import List from './List';
import OrderForm from './OrderForm';

class Purchase extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, purchase } = this.props;
    const { queryParams } = purchase;
    dispatch(action.getList(queryParams));
    dispatch(action.getGoodsList());
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
      dispatchList,
    } = this.props.purchase;
    const searchProps = {
      onAdd: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'purchase/updateState',
          payload: {
            formVisible: true,
            type: 'add',
          },
        });
        dispatch(action.getShopList());
        dispatch(action.getDispatchList());
      },
      onClear: () => {
        const { dispatch } = this.props;
        dispatch(action.getList());
      },
      onSearch: (props) => {
        const { dispatch, purchase } = this.props;
        const { queryParams } = purchase;
        dispatch({
          type: 'purchase/updateState',
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
            type: 'view',
          }),
        );
      },
      onUpdate: (record) => {
        this.props.dispatch(
          action.doGetDetail({
            orderNo: record.orderNo,
            type: 'edit',
          }),
        );
      },
      onDelete: (orderNo) => {
        const { dispatch } = this.props;
        dispatch(
          action.doDelete({
            orderNo,
          }),
        );
      },
      onWithdraw: (orderNo) => {
        const { dispatch } = this.props;
        dispatch(
          action.doWithdraw({
            orderNo,
          }),
        );
      },
    };
    const formProps = {
      // OrderForm数据
      type,
      orderInfo,
      shopList,
      dispatchList,
      onAdd: () => {
        this.props.dispatch({
          type: 'purchase/updateState',
          payload: {
            goodsModalVisible: true,
          },
        });
      },
      onSubmit: (values) => {
        if (formDataList.length === 0) {
          message.error('请购的物品列表不能为空');
          return;
        }
        const params = {
          ...values,
          goodsList: formDataList,
          amount: orderInfo.amount,
        };
        this.props.dispatch(action.doAdd(params));
      },
      onUpdate: () => {
        if (formDataList.length === 0) {
          message.error('请购的物品列表不能为空');
          return;
        }
        const params = {
          goodsList: formDataList,
          orderNo: orderInfo.orderNo,
          amount: orderInfo.amount,
          dispatchId: orderInfo.dispatchId,
          storeId: orderInfo.storeId,
          delIds,
        };
        this.props.dispatch(action.doUpdate(params));
      },
      onBack: () => {
        this.props.dispatch({
          type: 'purchase/updateState',
          payload: {
            formVisible: false,
            selectGoodsKeys: [],
            selectGoodsItems: [],
            formDataList: [],
            orderInfo: {
              amount: 0, // 请购总金额
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
            type: 'purchase/updateState',
            payload: {
              selectGoodsKeys: keys,
              selectGoodsItems: items,
            },
          });
        },
        onClose: (t) => {
          if (t) {
            this.props.dispatch({
              type: 'purchase/updateState',
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
            type: 'purchase/updateState',
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
          newDataList.forEach((d) => {
            money += d.goodsAmount;
          });
          console.warn('money', money);
          this.props.dispatch({
            type: 'purchase/updateState',
            payload: {
              formDataList: newDataList,
              orderInfo: {
                ...orderInfo,
                amount: money,
              },
            },
          });
        },
        onSetSelectItems: (newKeys, newItems) => {
          this.props.dispatch({
            type: 'purchase/updateState',
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
                type: 'purchase/updateState',
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
      <div className="purchase">
        {!formVisible && <Search {...searchProps} />}
        {!formVisible && <List {...listProps} />}
        {formVisible && <OrderForm {...formProps} />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    purchase: state.purchase,
  };
}

Purchase.propTypes = {
  purchase: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Purchase);
