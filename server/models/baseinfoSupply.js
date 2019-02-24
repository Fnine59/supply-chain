/**
 * @description 供应商基础信息表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import helper from '../utils/helper';

/* 基础信息模块 构造方法*/
const BaseInfoSupply = function (item) {
  this.props = item.props;
};

BaseInfoSupply.prototype.doCreate = function (params, callback) {
  const sql =
    'INSERT INTO baseinfo_supplier(name,status,type,address) VALUES(?,?,?,?)';
  const sqlParams = [params.name, params.status, params.type, params.address];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doCreate',
    callback,
  });
};

BaseInfoSupply.prototype.doGetList = function (params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from baseinfo_supplier limit ${start},${params.rows}`;
  const sql = `select * from baseinfo_supplier where name LIKE '%${
    params.name
  }%' ${params.status !== '' ? `AND status='${params.status}'` : ''} ${
    params.type !== '' ? `AND type='${params.type}'` : ''
  }`;
  console.log(sql);
  helper.doSql({
    sql,
    name: 'doGetList',
    callback,
  });
};

BaseInfoSupply.prototype.doEnable = function (params, callback) {
  const sql = `UPDATE baseinfo_supplier SET status='1' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doEnable',
    callback,
  });
};

BaseInfoSupply.prototype.doDisable = function (params, callback) {
  const sql = `UPDATE baseinfo_supplier SET status='0' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoSupply.prototype.doDelete = function (params, callback) {
  const sql = `DELETE FROM baseinfo_supplier WHERE id IN (${params.idsList})`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoSupply.prototype.doUpdate = function (params, callback) {
  const sql = `UPDATE baseinfo_supplier SET name='${params.name}',type='${
    params.type
  }' WHERE id=${params.id}`;
  helper.doSql({
    sql,
    name: 'doUpdate',
    callback,
  });
};

module.exports = BaseInfoSupply;
