import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../../redux/actions/supplyInfo';
import Search from './Search';
import List from './List';
import Modal from './Modal';

class SupplyInfo extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, supplyInfo } = this.props;
    const { queryParams } = supplyInfo;
    dispatch(action.getList(queryParams));
  }
  render() {
    const {
      modalVisible,
      dataList,
      selectKeys,
      selectItems,
      currentItem,
    } = this.props.supplyInfo;
    const searchProps = {
      selectKeys,
      selectItems,
      onAdd: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'supplyInfo/updateState',
          payload: {
            modalVisible: true,
          },
        });
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
        const { dispatch, supplyInfo } = this.props;
        const { queryParams } = supplyInfo;
        dispatch({
          type: 'supplyInfo/updateState',
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
      title: '新增供应商',
      visible: modalVisible,
      currentItem,
      onSubmit: (data) => {
        const { dispatch } = this.props;
        if (!Object.keys(currentItem).length > 0) {
          dispatch(action.doAdd({ ...data, status: true }));
          return;
        }
        console.warn('data', data);
        dispatch(action.doUpdate({ ...data }));
      },
      onCancel: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'supplyInfo/updateState',
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
          type: 'supplyInfo/updateState',
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
          type: 'supplyInfo/updateState',
          payload: {
            currentItem: item,
            modalVisible: true,
          },
        });
      },
    };
    return (
      <div className="supplyInfo">
        <Search {...searchProps} />
        <List {...listProps} />
        <Modal {...modalProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    supplyInfo: state.supplyInfo,
  };
}

SupplyInfo.propTypes = {
  supplyInfo: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(SupplyInfo);
