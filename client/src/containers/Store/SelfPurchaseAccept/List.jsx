import React from 'react';
import { Table, Badge, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { introduction } from '../../../common/utils/enums';

const List = ({
  dataSource,
  onView,
  onUpdate,
}) => {
  const columns = [
    {
      title: '单据编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '验收单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '关联发货单号',
      dataIndex: 'sendOrderNo',
      key: 'sendOrderNo',
    },
    {
      title: '请购门店',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '供应商',
      dataIndex: 'supplyName',
      key: 'supplyName',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: (
        <div>
          <span style={{ marginRight: 10 }}>更新时间</span>
          <Tooltip title={introduction.updateTime}>
            <Icon type="question-circle" />
          </Tooltip>
        </div>
      ),
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '采购总金额',
      dataIndex: 'purchaseAmount',
      key: 'purchaseAmount',
    },
    {
      title: '验收金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '验收差异金额',
      dataIndex: 'diffAmount',
      key: 'diffAmount',
    },
    {
      title: '单据状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case '1':
            return <Badge status="processing" text="待验收" />;
          case '2':
            return <Badge status="success" text="已入库" />;
          default:
            return '---';
        }
      },
    },
    {
      title: (
        <div>
          <span style={{ marginRight: 10 }}>操作</span>
          <Tooltip title={introduction.options}>
            <Icon type="question-circle" />
          </Tooltip>
        </div>
      ),
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
          {record.status === '1' && (
            <button
              className="btn-link"
              onClick={(e) => {
                onUpdate(record);
              }}
            >
              编辑
            </button>
          )}
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
  onUpdate: PropTypes.func,
};

export default List;
