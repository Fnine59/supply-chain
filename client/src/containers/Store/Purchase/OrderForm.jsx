import React from 'react';
import { Button, Form, Row, Col, Input, Select } from 'antd';
import PropTypes from 'prop-types';

import EditableTable from './EditableTable';
import GoodsModal from './GoodsModal';
import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const orderForm = ({
  amount,
  tableProps,
  modalProps,
  shopList,
  onAdd,
  onSubmit,
  onBack,
  form: { validateFields, getFieldDecorator },
}) => {
  const handleAdd = () => {
    onAdd();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };
  const handleBack = () => {
    onBack();
  };
  console.warn('amount', amount);
  return (
    <div className="form">
      <Form onSubmit={handleSubmit}>
        <div className="header">
          <Row>
            <Col span={8}>
              <FormItem label="请购门店" {...formItemLayout}>
                {getFieldDecorator('storeId', {
                  initialValue: '',
                  rules: [
                    {
                      required: true,
                      message: '请选择请购门店',
                    },
                  ],
                })(
                  <Select placeholder="请选择门店">
                    {shopList.map(d => (<Option value={d.id}>{d.name}</Option>))}
                  </Select>,
                )}
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="请购总金额" {...formItemLayout}>
                <Input disabled value={amount} />
              </FormItem>
            </Col>
          </Row>
        </div>
        <div className="opts">
          <Button type="primary" value="添加物品" onClick={handleAdd}>
            添加物品
          </Button>
        </div>
        <EditableTable {...tableProps} />
        <GoodsModal {...modalProps} />
        <div className="footer">
          <Row>
            <Col span={8}>
              <Button className="footer-opt" type="primary" htmlType="submit">请购</Button>
              <Button className="footer-opt" onClick={handleBack}>返回</Button>
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};

orderForm.propTypes = {
  amount: PropTypes.number,
  form: PropTypes.object,
  tableProps: PropTypes.object,
  modalProps: PropTypes.object,
  shopList: PropTypes.array,
  onAdd: PropTypes.func,
  onBack: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form.create()(orderForm);
