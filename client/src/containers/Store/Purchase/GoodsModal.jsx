import React from 'react';
import { Form, Badge, Modal, Table as AntdTable, Select } from 'antd';
import PropTypes from 'prop-types';

const goodsModal = ({
  visible,
  title,
  goodsList,
  selectGoodsKeys,
  onSelect,
  onClose,
}) => {
  const handleOk = () => {
    onClose();
  };

  const handleCancel = () => {
    onClose('cancel');
  };

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
      title: '物品单价',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
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
  ];

  const modalOpts = {
    visible,
    title,
    onOk: handleOk,
    onCancel: handleCancel,
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onSelect(selectedRowKeys, selectedRows);
    },
    selectedRowKeys: selectGoodsKeys,
  };

  return (
    <Modal {...modalOpts}>
      <AntdTable
        dataSource={goodsList}
        columns={columns}
        rowKey="id"
        rowSelection={rowSelection}
      />
    </Modal>
  );
};

goodsModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  goodsList: PropTypes.array,
};

export default goodsModal;
