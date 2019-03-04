import React from 'react';
import { Form, Row, Col, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';

import '../../../common/theme/search.less';

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

const Search = ({
  onAdd,
  onClear,
  onSearch,
  form: { validateFields, getFieldDecorator, resetFields },
}) => {
  const showConfirm = (e) => {
    const info = e.target.value;
    switch (info) {
      case '+ 创建自采单':
        onAdd();
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    resetFields();
    onClear();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        onSearch(values);
      }
    });
  };

  return (
    <div className="search">
      <Form onSubmit={handleSearch}>
        <Row>
          <Col span={8}>
            <FormItem label="自采单号" {...formItemLayout}>
              {getFieldDecorator('orderNo', {
                initialValue: '',
              })(<Input.Search allowClear placeholder="请输入自采单号" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="单据状态" {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: '',
              })(
                <Select>
                  <Option key="0" value="">
                    所有状态
                  </Option>
                  <Option key="1" value="1">
                    待处理
                  </Option>
                  <Option key="2" value="2">
                    已提交
                  </Option>
                  <Option key="3" value="3">
                    已完成
                  </Option>
                  <Option key="4" value="4">
                    已作废
                  </Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18} />
          <Col span={6} className="search-btn-wrap">
            <Button className="search-btn" onClick={handleClear}>
              清空条件
            </Button>
            <Button
              type="primary"
              className="search-btn"
              onClick={handleSearch}
              htmlType="submit"
            >
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            className="opt-btn"
            onClick={showConfirm}
            value="+ 创建自采单"
          >
            + 创建自采单
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Search.propTypes = {
  form: PropTypes.object,
  onAdd: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Form.create()(Search);
