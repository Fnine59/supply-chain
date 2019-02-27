import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import EditableTable from './EditableTable';
import GoodsModal from './GoodsModal';
import './index.less';

const form = ({ tableProps, modalProps, onAdd }) => {
  const handleAdd = () => {
    onAdd();
  };
  return (
    <div className="form">
      <div className="opts">
        <Button type="primary" value="添加物品" onClick={handleAdd}>
        添加物品
      </Button>
      </div>
      <EditableTable {...tableProps} />
      <GoodsModal {...modalProps} />
    </div>
  );
};

form.propTypes = {
  tableProps: PropTypes.object,
  modalProps: PropTypes.object,
  onAdd: PropTypes.func,
};

export default form;
