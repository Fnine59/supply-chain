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

const Search = () => {
  console.log('shopinfo');
  const onClearSearchInfo = () => {};
  const onSearchItem = () => {};
  const onSearch = () => {};
  return (
    <div className="search">
      <Form>
        <Row>
          <Col span={8}>
            <FormItem label="门店名称" {...formItemLayout}>
              <Input.Search
                allowClear
                placeholder="input search text"
                onSearch={value => console.log(value)}
              />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="门店状态" {...formItemLayout}>
              <Select defaultValue={''}>
                <Option key="0" value="">
                  所有状态
                </Option>
                <Option key="1" value="0">
                  已启用
                </Option>
                <Option key="2" value="1">
                  已停用
                </Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18} />
          <Col span={6} className="search-btn-wrap">
            <Button className="search-btn">清空条件</Button>
            <Button type="primary" className="search-btn">
              搜索
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col span={12}>
          <Button type="primary">+ 新增门店</Button>
        </Col>
      </Row>
    </div>
  );
};

Search.propTypes = {
};

export default Search;
