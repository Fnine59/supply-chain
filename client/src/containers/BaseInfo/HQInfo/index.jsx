import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as action from '../../../redux/actions/hqinfo';
import Search from './Search';
import List from './List';
import Modal from './Modal';

class HQInfo extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, hqinfo } = this.props;
    const { queryParams } = hqinfo;
    dispatch(action.getList(queryParams));
  }
  render() {
    const {
      modalVisible,
      dataList,
      selectKeys,
      selectItems,
      currentItem,
    } = this.props.hqinfo;
    const searchProps = {
      selectKeys,
      selectItems,
      onAdd: () => {
        const { dispatch } = this.props;
        dispatch({
          type: 'hqinfo/updateState',
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
        const { dispatch, hqinfo } = this.props;
        const { queryParams } = hqinfo;
        dispatch({
          type: 'hqinfo/updateState',
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
      title: '新增配送中心',
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
          type: 'hqinfo/updateState',
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
          type: 'hqinfo/updateState',
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
          type: 'hqinfo/updateState',
          payload: {
            currentItem: item,
            modalVisible: true,
          },
        });
      },
    };
    return (
      <div className="hqinfo">
        <Search {...searchProps} />
        <List {...listProps} />
        <Modal {...modalProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hqinfo: state.hqinfo,
  };
}

HQInfo.propTypes = {
  hqinfo: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(HQInfo);
