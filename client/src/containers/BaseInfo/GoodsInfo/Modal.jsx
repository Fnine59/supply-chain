import React from 'react';
import { Form, Input, Modal, Row, InputNumber } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const modal = ({
  currentItem,
  onSubmit,
  onCancel,
  form: { validateFields, getFieldDecorator, resetFields },
  ...modalProps
}) => {
  console.log('currentItem', currentItem);
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onSubmit({ ...values, id: currentItem.id });
      }
    });
  };
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
    onCancel,
    afterClose: resetFields,
  };
  return (
    <Modal {...modalOpts}>
      <Form>
        <Row>
          <FormItem {...formItemLayout} label="物品名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: currentItem.name || '',
              rules: [
                {
                  required: true,
                  message: '请输入物品名称',
                },
                {
                  pattern: /^.{1,20}$/,
                  message: '不多于20个字符',
                },
              ],
            })(<Input type="text" placeholder="不多于20个字符" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="物品单位" hasFeedback>
            {getFieldDecorator('unit', {
              initialValue: currentItem.unit || '',
              rules: [
                {
                  required: true,
                  message: '请输入物品单位',
                },
                {
                  pattern: /^.{1,4}$/,
                  message: '不多于4个字符',
                },
              ],
            })(<Input type="text" placeholder="不多于4个字符" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="物品单价" hasFeedback>
            {getFieldDecorator('unitPrice', {
              initialValue: currentItem.unitPrice || '',
              rules: [
                {
                  required: true,
                  message: '请输入物品单价',
                },
              ],
            })(<InputNumber min={0} max={9999999} precision={2} />)}
          </FormItem>
        </Row>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object,
  currentItem: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(modal);
