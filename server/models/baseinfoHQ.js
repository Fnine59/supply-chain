/**
 * @description 配送中心基础信息表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import helper from '../utils/helper';

/* 基础信息模块 构造方法*/
const BaseInfoHQ = function (item) {
  this.props = item.props;
};

BaseInfoHQ.prototype.doCreate = function (params, callback) {
  const sql = 'INSERT INTO baseinfo_dispatch(name,status,address) VALUES(?,?,?)';
  const sqlParams = [params.name, params.status, params.address];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doCreateShop',
    callback,
  });
};

BaseInfoHQ.prototype.doGetList = function (params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from baseinfo_dispatch limit ${start},${params.rows}`;
  const sql = `select * from baseinfo_dispatch where name LIKE '%${
    params.name
  }%' ${params.status !== '' ? `AND status='${params.status}'` : ''}`;
  helper.doSql({
    sql,
    name: 'doGetShopList',
    callback,
  });
};

BaseInfoHQ.prototype.doEnable = function (params, callback) {
  const sql = `UPDATE baseinfo_dispatch SET status='1' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doEnable',
    callback,
  });
};

BaseInfoHQ.prototype.doDisable = function (params, callback) {
  const sql = `UPDATE baseinfo_dispatch SET status='0' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoHQ.prototype.doDelete = function (params, callback) {
  const sql = `DELETE FROM baseinfo_dispatch WHERE id IN (${params.idsList})`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoHQ.prototype.doUpdate = function (params, callback) {
  const sql = `UPDATE baseinfo_dispatch SET name='${params.name}',address='${
    params.address
  }' WHERE id=${params.id}`;
  helper.doSql({
    sql,
    name: 'doUpdate',
    callback,
  });
};

module.exports = BaseInfoHQ;
