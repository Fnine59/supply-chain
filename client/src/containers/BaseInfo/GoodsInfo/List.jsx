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
      title: '物品编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '物品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '物品单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '物品规格',
      dataIndex: 'spec',
      key: 'spec',
    },
    {
      title: '物品状态',
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
      title: '物品单价',
      dataIndex: 'unit_price',
      key: 'unit_price',
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
          >{`${record.status === '1' ? '停用' : '启用'}物品`}</button>
          <button
            className="btn-link"
            onClick={(e) => {
              console.log(e, record);
              onUpdate(record);
            }}
          >
            编辑物品
          </button>
          <button
            className="btn-link"
            onClick={(e) => {
              confirm({
                title: '警告',
                content: '确定删除该物品吗？',
                cancelText: '取消',
                okText: '确定',
                onOk() {
                  onDelete([record.id]);
                },
                onCancel() {},
              });
            }}
          >
            删除物品
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
