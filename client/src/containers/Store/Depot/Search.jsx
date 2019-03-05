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
            <FormItem label="所属门店" {...formItemLayout}>
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
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: '',
              })(<Input.Search allowClear placeholder="请输入物品名称" />)}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('status', {
                initialValue: '',
              })(
                <Select>
                  <Option key="0" value="">
                    所有状态
                  </Option>
                  <Option key="1" value="1">
                    已启用
                  </Option>
                  <Option key="2" value="0">
                    已停用
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
