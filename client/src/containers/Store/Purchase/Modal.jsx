import React from 'react';
import { Form, Row, Modal, InputNumber, Select } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const Option = Select.Option;

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
  goodsList,
  shopList,
  onSubmit,
  onCancel,
  form: { validateFields, getFieldDecorator, resetFields },
  modalProps,
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
          <FormItem {...formItemLayout} label="请购物品" hasFeedback>
            {getFieldDecorator('goodsId', {
              initialValue: currentItem.goodsId || '',
              rules: [
                {
                  required: true,
                  message: '请选择请购物品！',
                },
              ],
            })(
              <Select placeholder="请选择请购物品">
                {goodsList.map(item => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="请购门店" hasFeedback>
            {getFieldDecorator('storeId', {
              initialValue: currentItem.storeId || '',
              rules: [
                {
                  required: true,
                  message: '请选择请购门店！',
                },
              ],
            })(
              <Select placeholder="请选择请购门店">
                {shopList.map(item => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="请购数量" hasFeedback>
            {getFieldDecorator('goodsCount', {
              initialValue: currentItem.goodsCount || 0,
              rules: [
                {
                  required: true,
                  message: '请输入请购数量',
                },
              ],
            })(<InputNumber min={0} max={9999999} precision={2} />)}
          </FormItem>
          <FormItem {...formItemLayout} label="请购金额" hasFeedback>
            {getFieldDecorator('amount', {
              initialValue: currentItem.unitPrice * currentItem.goodsCount || 0,
              rules: [
                {
                  required: true,
                  message: '请输入请购金额',
                },
              ],
            })(<InputNumber min={0} max={9999999} precision={2} disabled />)}
          </FormItem>
        </Row>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  goodsList: PropTypes.array,
  shopList: PropTypes.array,
  modalProps: PropTypes.object,
  form: PropTypes.object,
  currentItem: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(modal);
