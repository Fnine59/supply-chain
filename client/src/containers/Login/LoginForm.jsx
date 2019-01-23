import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './index.less';

const FormItem = Form.Item;

const LoginForm = ({
  onLogin,
  onRegister,
  form: {
    getFieldDecorator,
    validateFields,
  },
}) => {
  const handleRegister = (e) => {
    e.preventDefault();
    onRegister();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onLogin(values);
      }
    });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '用户名不能为空' }],
          })(
            <Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '密码不能为空' }],
          })(
            <Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />,
          )}
        </FormItem>
        <FormItem className="login-form-opt">
          <Button size="large" type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <a href="" onClick={handleRegister}>去注册</a>
        </FormItem>
      </Form>
    </div>
  );
};


LoginForm.propTypes = {
  form: PropTypes.object,
  onRegister: PropTypes.func,
  onLogin: PropTypes.func,
};

export default Form.create()(LoginForm);