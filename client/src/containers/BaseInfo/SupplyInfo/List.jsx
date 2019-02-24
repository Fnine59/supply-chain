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
      title: '供应商编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '供应商名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '供应商经营类型',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        switch (type) {
          case '1':
            return '公司类型供应商';
          case '2':
            return '个人类型供应商';
          default:
            return '---';
        }
      },
    },
    {
      title: '供应商地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '供应商状态',
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
          >{`${record.status === '1' ? '关停' : '启用'}供应商`}</button>
          <button
            className="btn-link"
            onClick={(e) => {
              console.log(e, record);
              onUpdate(record);
            }}
          >
            编辑供应商
          </button>
          <button
            className="btn-link"
            onClick={(e) => {
              confirm({
                title: '警告',
                content: '确定删除该供应商吗？',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                  onDelete([record.id]);
                },
                onCancel() {},
              });
            }}
          >
            删除供应商
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
