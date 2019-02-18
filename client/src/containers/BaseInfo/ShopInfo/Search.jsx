import React from 'react';
import { Modal, Form, Row, Col, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';

import '../../../common/theme/search.less';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

const formItemLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Search = ({
  selectKeys,
  selectItems,
  onAdd,
  onEnable,
  onDisable,
  onDelete,
  onClear,
  onSearch,
  form: { validateFields, getFieldDecorator, resetFields },
}) => {
  const showConfirm = (e) => {
    const info = e.target.value;
    let shopNumber = 0;
    let content = '';
    switch (info) {
      case '+ 新增门店':
        onAdd();
        break;
      case '启用':
        shopNumber = selectItems.filter(item => item.status === '0').length;
        content = `当前选中${
          selectKeys.length
        }个门店，可启用${shopNumber}个门店！`;
        break;
      case '停用':
        shopNumber = selectItems.filter(item => item.status === '1').length;
        content = `当前选中${
          selectKeys.length
        }个门店，可停用${shopNumber}个门店！`;
        break;
      case '删除门店':
        shopNumber = selectKeys.length;
        content = `当前选中${selectKeys.length}个门店，确认删除吗？`;
        break;
      default:
        break;
    }
    if (info !== '+ 新增门店') {
      confirm({
        title: `确定${e.target.value}吗？`,
        content,
        cancelText: '取消',
        okText: '确定',
        onOk() {
          switch (info) {
            case '启用':
              onEnable();
              break;
            case '停用':
              onDisable();
              break;
            case '删除门店':
              onDelete();
              break;
            default:
              break;
          }
        },
        onCancel() {},
      });
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
            <FormItem label="门店名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: '',
              })(
                <Input.Search
                  allowClear
                  placeholder="请输入门店名称"
                />,
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="门店状态" {...formItemLayout}>
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
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            className="opt-btn"
            onClick={showConfirm}
            value="+ 新增门店"
          >
            + 新增门店
          </Button>
          <Button className="opt-btn" onClick={showConfirm} value="启用">
            启用
          </Button>
          <Button className="opt-btn" onClick={showConfirm} value="停用">
            停用
          </Button>
          <Button
            className="opt-btn"
            type="danger"
            onClick={showConfirm}
            value="删除门店"
          >
            删除门店
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Search.propTypes = {
  selectItems: PropTypes.array,
  selectKeys: PropTypes.array,
  form: PropTypes.object,
  onAdd: PropTypes.func,
  onEnable: PropTypes.func,
  onDisable: PropTypes.func,
  onDelete: PropTypes.func,
  onClear: PropTypes.func,
  onSearch: PropTypes.func,
};

export default Form.create()(Search);
