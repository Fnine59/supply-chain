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
  onSubmit,
  onCancel,
  form: { validateFields, getFieldDecorator, resetFields },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors, values) => {
      if (!errors) {
        onSubmit(values);
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
          <FormItem {...formItemLayout} label="门店名称" hasFeedback>
            {getFieldDecorator('name', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入门店名称',
                },
                {
                  pattern: /^.{1,20}$/,
                  message: '不多于20个字符',
                },
              ],
            })(<Input type="text" placeholder="不多于20个字符" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="门店地址" hasFeedback>
            {getFieldDecorator('address', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请输入门店地址！',
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
  item: PropTypes.object,
  // postList: PropTypes.array,
  title: PropTypes.string,
  realname: PropTypes.string,
  modalVisible: PropTypes.bool,
  loading: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Form.create()(modal);
