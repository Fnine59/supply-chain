import React from 'react';
import { Table, Badge, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { introduction } from '../../../common/utils/enums';

const List = ({
  dataSource,
  onView,
}) => {
  const columns = [
    {
      title: '单据编码',
      dataIndex: 'id',
      key: 'id',
    },
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
      title: '供应商',
      dataIndex: 'supplyName',
      key: 'supplyName',
    },
    {
      title: '入库时间',
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
      title: '入库金额',
      dataIndex: 'amount',
      key: 'amount',
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
