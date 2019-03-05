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
  shopList,
  onClear,
  onSearch,
  form: { validateFields, getFieldDecorator, resetFields },
}) => {
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
            <FormItem label="入库门店" {...formItemLayout}>
              {getFieldDecorator('storeId', {
                initialValue: '',
              })(
                <Select>
                  <Option key="0" value="">
                    全部门店
                  </Option>
                  {shopList.map(it => (
                    <Option key={it.id} value={it.id}>
                      {it.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="入库来源单号" {...formItemLayout}>
              {getFieldDecorator('orderNo', {
                initialValue: '',
              })(<Input.Search allowClear placeholder="请输入入库来源单号" />)}
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
    </div>
  );
};

Search.propTypes = {
  shopList: PropTypes.array,
  form: PropTypes.object,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Form.create()(Search);
