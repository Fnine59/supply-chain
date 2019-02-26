/**
 * @description 物品基础信息表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import helper from '../utils/helper';

/* 基础信息模块 构造方法*/
const BaseInfoGoods = function (item) {
  this.props = item.props;
};

BaseInfoGoods.prototype.doCreate = function (params, callback) {
  const sql =
    'INSERT INTO baseinfo_goods(unit,name,status,unit_price) VALUES(?,?,?,?)';
  const sqlParams = [params.unit, params.name, params.status, params.unitPrice];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doCreate',
    callback,
  });
};

BaseInfoGoods.prototype.doGetList = function (params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from baseinfo_goods limit ${start},${params.rows}`;
  const sql = `select * from baseinfo_goods where name LIKE '%${
    params.name
  }%' ${params.status !== '' ? `AND status='${params.status}'` : ''}`;
  helper.doSql({
    sql,
    name: 'doGetList',
    callback,
  });
};

BaseInfoGoods.prototype.doEnable = function (params, callback) {
  const sql = `UPDATE baseinfo_goods SET status='1' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doEnable',
    callback,
  });
};

BaseInfoGoods.prototype.doDisable = function (params, callback) {
  const sql = `UPDATE baseinfo_goods SET status='0' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoGoods.prototype.doDelete = function (params, callback) {
  const sql = `DELETE FROM baseinfo_goods WHERE id IN (${params.idsList})`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

BaseInfoGoods.prototype.doUpdate = function (params, callback) {
  const sql = `UPDATE baseinfo_goods SET name='${params.name}',unit='${
    params.unit
  }',unit_price='${params.unitPrice}' WHERE id=${params.id}`;
  helper.doSql({
    sql,
    name: 'doUpdate',
    callback,
  });
};

module.exports = BaseInfoGoods;
