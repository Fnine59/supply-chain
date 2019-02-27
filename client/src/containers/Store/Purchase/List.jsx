import React from 'react';
import { Table, Badge, Modal } from 'antd';
import PropTypes from 'prop-types';

const confirm = Modal.confirm;

const List = ({
  dataSource,
  selectKeys,
  onSelect,
  onEnable,
  onDisable,
  onDelete,
  onUpdate,
}) => {
  const columns = [
    {
      title: '请购单编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '请购单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '请购金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '请购门店',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '单据状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case '0':
            return <Badge status="error" text="已停用" />;
          case '1':
            return <Badge status="success" text="已启用" />;
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
              if (record.status === '1') {
                onDisable([record.id]);
                return;
              }
              onEnable([record.id]);
            }}
          >{`${record.status === '1' ? '停用' : '启用'}请购单`}</button>
          <button
            className="btn-link"
            onClick={(e) => {
              onUpdate(record);
            }}
          >
            编辑
          </button>
          <button
            className="btn-link"
            onClick={(e) => {
              confirm({
                title: '警告',
                content: '确定删除该请购单吗？',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                  onDelete([record.id]);
                },
                onCancel() {},
              });
            }}
          >
            删除
          </button>
        </span>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelect(selectedRowKeys, selectedRows);
    },
    selectedRowKeys: selectKeys,
  };

  return (
    <div className="search">
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey="id"
        rowSelection={rowSelection}
      />
    </div>
  );
};

List.propTypes = {
  selectKeys: PropTypes.array,
  dataSource: PropTypes.array,
  onSelect: PropTypes.func,
  onEnable: PropTypes.func,
  onDisable: PropTypes.func,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default List;
