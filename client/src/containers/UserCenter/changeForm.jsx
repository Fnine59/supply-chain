import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

const changeForm = ({
  userInfo,
  onModify,
  form: { getFieldDecorator, validateFields },
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onModify({ ...userInfo, ...values });
      }
    });
  };
  return (
    <div className="userCenter-form-cont">
      <Form onSubmit={handleSubmit} className="userCenter-form">
        <FormItem>
          {getFieldDecorator('nickname', {
            initialValue: userInfo.nickname || '',
            rules: [
              { required: true, message: '用户昵称不能为空' },
              { max: 18, message: '最长18个字符' },
              {
                pattern: /^[a-zA-Z_\u4e00-\u9fa5]{1,}$/,
                message: '只允许输入大小写字母、汉字或下划线',
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户昵称"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: userInfo.username || '',
            rules: [
              { required: true, message: '用户名不能为空' },
              { max: 18, message: '最长18个字符' },
              {
                pattern: /^[0-9a-zA-Z_]{1,}$/,
                message: '只允许输入大小写字母、数字或下划线',
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入用户名"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('oldPassword', {
            rules: [
              { required: true, message: '原始密码不能为空' },
              { max: 18, message: '最长18个字符' },
              {
                pattern: /^[0-9a-zA-Z]{1,}$/,
                message: '只允许输入大小写字母或数字',
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入原始密码"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('newPassword', {
            rules: [
              { required: true, message: '新密码不能为空' },
              { max: 18, message: '最长18个字符' },
              {
                pattern: /^[0-9a-zA-Z]{1,}$/,
                message: '只允许输入大小写字母或数字',
              },
            ],
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="请输入新密码"
            />,
          )}
        </FormItem>
        <FormItem className="userCenter-form-opt">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="userCenter-form-button"
          >
            保存修改
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

changeForm.propTypes = {
  userInfo: PropTypes.object,
  form: PropTypes.object,
  onModify: PropTypes.func,
};

export default Form.create()(changeForm);
