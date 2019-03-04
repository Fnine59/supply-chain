import React from 'react';
import { Table, Badge, Modal, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';

import { introduction } from '../../../common/utils/enums';

const confirm = Modal.confirm;

const List = ({
  dataSource,
  onView,
  onDelete,
  onUpdate,
  onWithdraw,
}) => {
  const columns = [
    {
      title: '单据编码',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '请购单号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '请购门店',
      dataIndex: 'storeName',
      key: 'storeName',
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
      title: '请购金额',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '单据状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        switch (status) {
          case '1':
            return <Badge status="processing" text="待处理" />;
          case '2':
            return <Badge status="warning" text="已提交" />;
          case '3':
            return <Badge status="success" text="已完成" />;
          case '4':
            return <Badge status="default" text="已作废" />;
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
          {record.status === '1' && (
            <button
              className="btn-link"
              onClick={(e) => {
                confirm({
                  title: '警告',
                  content: '确定删除该请购单吗？',
                  cancelText: '取消',
                  okText: '确定',
                  onOk() {
                    onDelete(record.orderNo);
                  },
                  onCancel() {},
                });
              }}
            >
              删除
            </button>
          )}
          {record.status === '2' && (
            <button
              className="btn-link"
              onClick={(e) => {
                confirm({
                  title: '警告',
                  content: '该单据已提交到总部，如果撤回该单据将作废，确认撤回吗？',
                  cancelText: '取消',
                  okText: '确定',
                  onOk() {
                    onWithdraw(record.orderNo);
                  },
                  onCancel() {},
                });
              }}
            >
              撤回
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
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
  onWithdraw: PropTypes.func,
};

export default List;
