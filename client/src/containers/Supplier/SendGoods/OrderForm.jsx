import React from 'react';
import { Button, Form, Row, Col, InputNumber, Input, Table } from 'antd';
import PropTypes from 'prop-types';

import GoodsModal from './GoodsModal';
import './index.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const orderForm = ({
  orderInfo,
  type,
  tableProps,
  modalProps,
  onUpdate,
  onBack,
  form: { validateFields, getFieldDecorator },
}) => {
  let totalAmt = 0;
  tableProps.dataSource.forEach((it) => {
    totalAmt += it.goodsAmount;
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err) => {
      if (!err) {
        if (type === 'edit') {
          const newList = [];
          tableProps.dataSource.forEach((it) => {
            newList.push({
              ...it,
              sendGoodsAmount: it.goodsAmount,
              sendGoodsCount: it.goodsCount,
            });
          });
          onUpdate(newList, totalAmt);
        }
      }
    });
  };
  const handleBack = () => {
    onBack();
  };
  return (
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <div className="header">
          <Row>
            <Col span={8}>
              <FormItem label="发货门店" {...formItemLayout}>
                {getFieldDecorator('storeName', {
                  initialValue: orderInfo.storeName || '',
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="发货总金额" {...formItemLayout}>
                <InputNumber
                  disabled
                  precision={2}
                  min={0}
                  value={type === 'view' ? orderInfo.amount : totalAmt}
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        <Table
          bordered
          dataSource={tableProps.dataSource}
          columns={[
            {
              title: '物品编码',
              dataIndex: 'id',
            },
            {
              title: '物品名称',
              dataIndex: 'name',
            },
            {
              title: '物品单位',
              dataIndex: 'unit',
            },
            {
              title: '物品单价',
              dataIndex: 'unitPrice',
            },
            {
              title: '自采数量',
              dataIndex: 'goodsCount',
            },
            {
              title: '自采金额',
              dataIndex: 'goodsAmount',
            },
            {
              title: '发货数量',
              dataIndex: 'sendGoodsCount',
              render: (text, record) => {
                if (type === 'view') {
                  return text;
                }
                return record.goodsCount;
              },
            },
            {
              title: '发货金额',
              dataIndex: 'sendGoodsAmount',
              render: (text, record) => {
                if (type === 'view') {
                  return text;
                }
                return record.goodsAmount;
              },
            },
          ]}
        />
        <GoodsModal {...modalProps} />
        <div className="footer">
          <Row>
            <Col span={8}>
              {type !== 'view' && (
                <Button className="footer-opt" type="primary" htmlType="submit">
                  提交
                </Button>
              )}
              <Button className="footer-opt" onClick={handleBack}>
                返回
              </Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

orderForm.propTypes = {
  type: PropTypes.string,
  orderInfo: PropTypes.object,
  form: PropTypes.object,
  tableProps: PropTypes.object,
  modalProps: PropTypes.object,
  onBack: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default Form.create()(orderForm);
