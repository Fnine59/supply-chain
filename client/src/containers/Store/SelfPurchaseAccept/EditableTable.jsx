import React from 'react';
import { Table as AntdTable, Form, Icon, InputNumber } from 'antd';
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

  // eslint-disable-next-line no-undef
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  // eslint-disable-next-line no-undef
  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  render() {
    const { editing } = this.state;
    const { editable, dataIndex, title, record, ...restProps } = this.props;
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
                        message: `请输入${title ? title.props.children[0].props.children : '必填项'}`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(
                    <InputNumber
                      ref={node => (this.input = node)}
                      onPressEnter={this.save}
                      onBlur={this.save}
                      precision={2}
                      min={0}
                      max={record.deliveryCount}
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

EditableCell.propTypes = {
  editable: PropTypes.bool,
  dataIndex: PropTypes.string,
  title: PropTypes.string,
  record: PropTypes.object,
  handleSave: PropTypes.func,
};

class EditableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.columns = [
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
        title: '门店采购数量',
        dataIndex: 'purchaseCount',
      },
      {
        title: '供应商发货数量',
        dataIndex: 'deliveryCount',
      },
      {
        title: '运输差异数量',
        dataIndex: 'sendDiffCount',
      },
      {
        title: '运输差异金额',
        dataIndex: 'sendDiffAmount',
      },
      {
        title: (
          <div>
            <span style={{ marginRight: 10 }}>验收数量</span>
            <Icon type="edit" />
          </div>
        ),
        dataIndex: 'acceptCount',
        editable: true,
      },
      {
        title: '验收金额',
        dataIndex: 'acceptAmount',
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

  // eslint-disable-next-line no-undef
  handleDelete = (id) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });

    // 调用业务处理方法来同步数据
    this.props.onSetSelectItems(
      this.props.selectGoodsKeys.filter(item => item !== id),
      this.props.selectGoodsItems.filter(item => item.id !== id),
    );
    this.props.onSetDataSource(dataSource.filter(item => item.id !== id));
    this.props.onDeleteGoods(id);
  };

  // eslint-disable-next-line no-undef
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });

    // 调用业务处理方法来同步数据
    const calcNewData = newData.map(it => ({
      ...it,
      acceptAmount: it.acceptCount * it.unitPrice,
      sendDiffCount: it.purchaseCount - it.acceptCount,
      sendDiffAmount: (it.purchaseCount - it.acceptCount) * it.unitPrice,
    }));
    this.props.onSetDataSource(calcNewData);
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
          pagination={false}
        />
      </div>
    );
  }
}

EditableTable.propTypes = {
  selectGoodsKeys: PropTypes.array,
  selectGoodsItems: PropTypes.array,
  dataSource: PropTypes.array,
  onSetDataSource: PropTypes.func,
  onSetSelectItems: PropTypes.func,
  onDeleteGoods: PropTypes.func,
};

export default EditableTable;
