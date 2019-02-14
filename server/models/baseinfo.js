/**
 * @description 基础信息表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-14
 */

import helper from '../utils/helper';

/* 基础信息模块 构造方法*/
const BaseInfo = function (baseinfo) {
  this.props = baseinfo.props;
};

BaseInfo.prototype.doCreateShop = function (params, callback) {
  const sql = 'INSERT INTO baseinfo_store(name,status,address) VALUES(?,?,?)';
  const sqlParams = [params.name, params.status, params.address];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doCreateShop',
    callback,
  });
};

BaseInfo.prototype.doGetShopList = function (params, callback) {
  console.log(params);
  const start = (params.page - 1) * params.rows;
  const sql = `select * from baseinfo_store limit ${start},20`;
  helper.doSql({
    sql,
    name: 'doGetShopList',
    callback,
  });
};

module.exports = BaseInfo;
