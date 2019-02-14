import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const List = ({
  dataSource,
}) => {
  const columns = [{
    title: '门店编码',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: '门店名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '门店状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      switch (status) {
        case false:
          return '已停用';
        case true:
          return '已启用';
        default:
          return '---';
      }
    },
  }, {
    title: '操作',
    key: 'action',
    render: (text, record) => {
      if (record.status === false) {
        return (
          <span>
            <button className="btn-link" onClick={(e) => { console.log(e, record); }}>启用门店</button>
          </span>
        );
      } else if (record.status === true) {
        return (
          <span>
            <button className="btn-link" onClick={(e) => { console.log(e, record); }}>关停门店</button>
          </span>
        );
      }
      return ('---');
    },
  }];

  return (
    <div className="search">
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

List.propTypes = {
  dataSource: PropTypes.array,
};

export default List;
