import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

const List = ({ dataSource }) => {
  const columns = [
    {
      title: '门店编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '门店名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '门店地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '门店状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case '0':
            return '已停用';
          case '1':
            return '已启用';
          default:
            return '---';
        }
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
              console.log(e, record);
            }}
          >{`${record.status === '0' ? '关停' : '启用'}门店`}</button>
          <button
            className="btn-link"
            onClick={(e) => {
              console.log(e, record);
            }}
          >
            编辑门店
          </button>
          <button
            className="btn-link"
            onClick={(e) => {
              console.log(e, record);
            }}
          >
            删除门店
          </button>
        </span>
      ),
    },
  ];

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
