import React from 'react';
import { Form, Input, Modal, Row } from 'antd';
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
          <FormItem {...formItemLayout} label="配送中心名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: currentItem.name || '',
              rules: [
                {
                  required: true,
                  message: '请输入配送中心名称',
                },
                {
                  pattern: /^.{1,20}$/,
                  message: '不多于20个字符',
                },
              ],
            })(<Input type="text" placeholder="不多于20个字符" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="配送中心地址" hasFeedback>
            {getFieldDecorator('address', {
              initialValue: currentItem.address || '',
              rules: [
                {
                  required: true,
                  message: '请输入配送中心地址！',
                },
                {
                  pattern: /^.{1,40}$/,
                  message: '不多于40个字符',
                },
              ],
            })(<Input type="text" placeholder="不多于40个字符" />)}
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
