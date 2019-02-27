import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { message } from 'antd';

import * as action from '../../../redux/actions/purchase';
import Search from './Search';
import List from './List';
import Modal from './Modal';
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
      goodsModalVisible,
      formVisible,
      modalVisible,
      amount,
      selectGoodsKeys,
      selectGoodsItems,
      formDataList,
      dataList,
      selectKeys,
      selectItems,
      currentItem,
      goodsList,
      shopList,
    } = this.props.purchase;
    console.warn('index ', shopList);
    const searchProps = {
      selectKeys,
      selectItems,
      onAdd: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'purchase/updateState',
          payload: {
            formVisible: true,
          },
        });
        dispatch(action.getShopList());
      },
      onEnable: () => {
        const { dispatch } = this.props;
        dispatch(
          action.doEnable({
            idsList: selectKeys,
          }),
        );
      },
      onDisable: () => {
        const { dispatch } = this.props;
        dispatch(
          action.doDisable({
            idsList: selectKeys,
          }),
        );
      },
      onDelete: () => {
        const { dispatch } = this.props;
        dispatch(action.doDelete({ idsList: selectKeys }));
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
    const modalProps = {
      title: '新增请购单',
      visible: modalVisible,
      currentItem,
      goodsList,
      shopList,
      onSubmit: (data) => {
        const { dispatch } = this.props;
        if (!Object.keys(currentItem).length > 0) {
          dispatch(action.doAdd({ ...data, status: true }));
          return;
        }
        dispatch(action.doUpdate({ ...data }));
      },
      onCancel: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'purchase/updateState',
          payload: {
            modalVisible: false,
            currentItem: {},
          },
        });
      },
    };
    const listProps = {
      dataSource: dataList,
      selectKeys,
      onSelect: (keys, items) => {
        this.props.dispatch({
          type: 'purchase/updateState',
          payload: {
            selectKeys: keys,
            selectItems: items,
          },
        });
      },
      onEnable: (keys) => {
        const { dispatch } = this.props;
        if (keys) {
          dispatch(
            action.doEnable({
              idsList: keys,
            }),
          );
          return;
        }
        dispatch(
          action.doEnable({
            idsList: selectKeys,
          }),
        );
      },
      onDisable: (keys) => {
        const { dispatch } = this.props;
        if (keys) {
          dispatch(
            action.doDisable({
              idsList: keys,
            }),
          );
          return;
        }
        dispatch(
          action.doDisable({
            idsList: selectKeys,
          }),
        );
      },
      onDelete: (keys) => {
        const { dispatch } = this.props;
        if (keys) {
          dispatch(
            action.doDelete({
              idsList: keys,
            }),
          );
          return;
        }
        dispatch(action.doDelete({ idsList: selectKeys }));
      },
      onUpdate: (item) => {
        this.props.dispatch({
          type: 'purchase/updateState',
          payload: {
            currentItem: item,
            modalVisible: true,
          },
        });
      },
    };
    const formProps = {
      // OrderForm数据
      amount,
      shopList,
      onAdd: () => {
        this.props.dispatch({
          type: 'purchase/updateState',
          payload: {
            goodsModalVisible: true,
          },
        });
      },
      onSubmit: (id) => {
        if (formDataList.length === 0) {
          message.error('请购的物品列表不能为空');
          return;
        }
        const params = {
          goodsList: formDataList,
          storeId: id,
          amount,
        };
        console.warn('params', params);
        this.props.dispatch(action.doAdd(params));
      },
      onBack: () => {
        this.props.dispatch({
          type: 'purchase/updateState',
          payload: {
            formVisible: false,
            amount: 0,
            formDataList: [],
            selectGoodsKeys: [],
            selectGoodsItems: [],
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
        onClose: (type) => {
          if (type) {
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
              amount: money,
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
      },
    };
    return (
      <div className="purchase">
        {!formVisible && <Search {...searchProps} />}
        {!formVisible && <List {...listProps} />}
        <Modal {...modalProps} />
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
