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
  tableProps,
  modalProps,
  onBack,
  form: { getFieldDecorator },
}) => {
  const handleBack = () => {
    onBack();
  };
  return (
    <div className="form">
      <Form>
        <div className="header">
          <Row>
            <Col span={8}>
              <FormItem label="入库门店" {...formItemLayout}>
                {getFieldDecorator('storeName', {
                  initialValue: orderInfo.storeName || '',
                })(<Input disabled />)}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="入库类型" {...formItemLayout}>
                {getFieldDecorator('type', {
                  initialValue:
                    (() => {
                      if (orderInfo.type === 'pr') {
                        return '门店请购';
                      }
                      if (orderInfo.type === 'sf') {
                        return '门店自采';
                      }
                      return '--';
                    })() || '',
                })(<Input disabled />)}
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
              dataIndex: 'goodsId',
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
              title: '入库数量',
              dataIndex: 'goodsCount',
            },
            {
              title: '入库金额',
              dataIndex: 'goodsAmount',
            },
          ]}
        />
        <GoodsModal {...modalProps} />
        <div className="footer">
          <Row>
            <Col span={8}>
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
  orderInfo: PropTypes.object,
  form: PropTypes.object,
  tableProps: PropTypes.object,
  modalProps: PropTypes.object,
  onBack: PropTypes.func,
};

export default Form.create()(orderForm);
