import React from 'react';
import {
  Button,
  Form,
  Row,
  Col,
  InputNumber,
  Select,
  Input,
  Table,
} from 'antd';
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
  orderInfo,
  type,
  tableProps,
  modalProps,
  shopList,
  onUpdate,
  onBack,
  form: { validateFields, getFieldDecorator },
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (type === 'edit') {
          onUpdate();
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
            {type === 'add' && (
              <Col span={8}>
                <FormItem label="配送门店" {...formItemLayout}>
                  {getFieldDecorator('storeId', {
                    initialValue: '',
                    rules: [
                      {
                        required: true,
                        message: '请选择配送门店',
                      },
                    ],
                  })(
                    <Select placeholder="请选择门店">
                      {shopList.map(d => (
                        <Option value={d.id}>{d.name}</Option>
                      ))}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            )}
            {(type === 'view' || type === 'edit') && (
              <Col span={8}>
                <FormItem label="配送门店" {...formItemLayout}>
                  {getFieldDecorator('storeName', {
                    initialValue: orderInfo.storeName || '',
                  })(<Input disabled />)}
                </FormItem>
              </Col>
            )}
            <Col span={8}>
              <FormItem label="配送总金额" {...formItemLayout}>
                <InputNumber
                  disabled
                  precision={2}
                  min={0}
                  value={orderInfo.amount}
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="配送差异总金额" {...formItemLayout}>
                <InputNumber
                  disabled
                  precision={2}
                  min={0}
                  value={orderInfo.diffAmount}
                />
              </FormItem>
            </Col>
          </Row>
        </div>
        {type !== 'view' && <EditableTable {...tableProps} />}
        {type === 'view' && (
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
                title: '请购数量',
                dataIndex: 'goodsCount',
              },
              {
                title: '请购金额',
                dataIndex: 'goodsAmount',
              },
              {
                title: '配送数量',
                dataIndex: 'dispatchGoodsCount',
              },
              {
                title: '配送金额',
                dataIndex: 'dispatchGoodsAmount',
              },
              {
                title: '配送差异数量',
                dataIndex: 'dispatchGoodsDiffCount',
              },
              {
                title: '配送差异金额',
                dataIndex: 'dispatchGoodsDiffAmount',
              },
            ]}
          />
        )}
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
  shopList: PropTypes.array,
  onBack: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default Form.create()(orderForm);
