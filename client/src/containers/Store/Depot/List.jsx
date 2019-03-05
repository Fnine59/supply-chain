import React from 'react';
import { Table, Badge, Modal } from 'antd';
import PropTypes from 'prop-types';

const confirm = Modal.confirm;

const List = ({
  dataSource,
}) => {
  const columns = [
    {
      title: '物品编码',
      dataIndex: 'goodsId',
      key: 'goodsId',
    },
    {
      title: '物品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
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
    {
      title: '所属门店',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '库存数量',
      dataIndex: 'depotCount',
      key: 'depotCount',
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
};

export default List;
