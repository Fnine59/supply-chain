import React from 'react';
import PropTypes from 'prop-types';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

const LoginForm = ({
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  const FormItemLayout = {
    labelCol: {
      xs: { span: 4 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 6 },
      xl: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 14 },
      xl: { span: 14 },
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('fjskdfakdsjfksdflasdfasd');
  };
  return (
    <div>
      <Form>
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>,
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};


LoginForm.propTypes = {
};

export default Form.create()(LoginForm);
