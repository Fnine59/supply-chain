import React from 'react';
import { Table as AntdTable, Popconfirm, Form, Input } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const EditableContext = React.createContext();

// 可编辑行
const EditableRow = ({ form, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
EditableRow.propTypes = {
  form: PropTypes.object,
};
const EditableFormRow = Form.create()(EditableRow);

// 可编辑单元格
class EditableCell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      console.warn(record, values);
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return editing ? (
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `请输入${title}`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(
                    <Input
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                    />,
                  )}
                </FormItem>
              ) : (
                <div
                  className="editable-cell-value-wrap"
                  style={{ paddingRight: 24 }}
                  onClick={this.toggleEdit}
                >
                  {restProps.children}
                </div>
              );
            }}
          </EditableContext.Consumer>
        ) : (
          restProps.children
        )}
      </td>
    );
  }
}

class EditableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '物品编码',
        dataIndex: 'id',
        width: '200px',
      },
      {
        title: '物品名称',
        dataIndex: 'name',
      },
      {
        title: '物品单位',
        dataIndex: 'unit',
        width: '200px',
      },
      {
        title: '物品单价',
        dataIndex: 'unitPrice',
        width: '200px',
      },
      {
        title: '请购数量',
        dataIndex: 'goodsCount',
        width: '200px',
        editable: true,
      },
      {
        title: '物品采购金额',
        dataIndex: 'goodsAmount',
        width: '200px',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="确定删除该物品吗？"
              onConfirm={() => this.handleDelete(record.id)}
            >
              <button className="btn-link">删除物品</button>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: this.props.dataSource,
    };
  }

  componentWillReceiveProps(next) {
    this.setState({
      dataSource: next.dataSource,
    });
  }

  handleDelete = (id) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <AntdTable
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}
export default EditableTable;
