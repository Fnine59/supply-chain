import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const List = ({
  dataSource,
  onView,
}) => {
  const columns = [
    {
      title: '入库来源单号',
      dataIndex: 'acceptOrderNo',
      key: 'acceptOrderNo',
    },
    {
      title: '入库门店',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '入库时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '入库类型',
      dataIndex: 'type',
      key: 'type',
      render: (text) => {
        if (text === 'pr') {
          return '门店请购';
        }
        if (text === 'sf') {
          return '门店自采';
        }
        return '--';
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <button
            className="btn-link"
            onClick={(e) => {
              onView(record);
            }}
          >
            查看
          </button>
        </span>
      ),
    },
  ];

  return (
    <div className="search">
      <Table
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
};

List.propTypes = {
  dataSource: PropTypes.array,
  onView: PropTypes.func,
};

export default List;
