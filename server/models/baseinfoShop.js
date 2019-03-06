/**
 * @description 门店基础信息表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-14
 */

import helper from '../utils/helper';

/* 基础信息模块 构造方法*/
const BaseInfoShop = function (item) {
  this.props = item.props;
};

BaseInfoShop.prototype.doCreate = function (params, callback) {
  const sql = 'INSERT INTO baseinfo_store(name,status,address) VALUES(?,?,?)';
  const sqlParams = [params.name, params.status, params.address];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doCreateShop',
    callback,
  });
};

BaseInfoShop.prototype.doGetList = function (params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from baseinfo_store limit ${start},${params.rows}`;
  const sql = `select * from baseinfo_store where name LIKE '%${
    params.name || ''
  }%' ${params.status !== '' ? `AND status='${params.status}'` : ''}`;
  helper.doSql({
    sql,
    name: 'doGetShopList',
    callback,
  });
};

BaseInfoShop.prototype.doEnable = function (params, callback) {
  const sql = `UPDATE baseinfo_store SET status='1' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doEnable',
    callback,
  });
};

BaseInfoShop.prototype.doDisable = function (params, callback) {
  const sql = `UPDATE baseinfo_store SET status='0' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoShop.prototype.doDelete = function (params, callback) {
  const sql = `DELETE FROM baseinfo_store WHERE id IN (${params.idsList})`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoShop.prototype.doUpdate = function (params, callback) {
  const sql = `UPDATE baseinfo_store SET name='${params.name}',address='${
    params.address
  }' WHERE id=${params.id}`;
  helper.doSql({
    sql,
    name: 'doUpdate',
    callback,
  });
};

module.exports = BaseInfoShop;
