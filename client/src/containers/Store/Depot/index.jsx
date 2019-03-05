import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getList from '../../../redux/actions/depot';
import Search from './Search';
import List from './List';

class Depot extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const { dispatch, depot } = this.props;
    const { queryParams } = depot;
    dispatch(getList(queryParams));
  }
  render() {
    const {
      dataList,
    } = this.props.depot;
    const searchProps = {
      onClear: () => {
        const { dispatch } = this.props;
        dispatch(getList());
      },
      onSearch: (props) => {
        const { dispatch, depot } = this.props;
        const { queryParams } = depot;
        dispatch({
          type: 'depot/updateState',
          payload: {
            queryParams: {
              ...queryParams,
              ...props,
            },
          },
        });
        dispatch(
          getList({
            ...queryParams,
            ...props,
          }),
        );
      },
    };
    const listProps = {
      dataSource: dataList,
    };
    return (
      <div className="depot">
        <Search {...searchProps} />
        <List {...listProps} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    depot: state.depot,
  };
}

Depot.propTypes = {
  depot: PropTypes.object,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(Depot);
