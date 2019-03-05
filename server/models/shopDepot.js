/**
 * @description 门店库存表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from '../utils/helper';

/* 门店模块 构造方法*/
const ShopDepot = function (item) {
  this.props = item.props;
};

ShopDepot.prototype.doGetList = function (params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from baseinfo_goods limit ${start},${params.rows}`;
  const sql = `select * from baseinfo_goods where name LIKE '%${params.name ||
    ''}%' ${params.status !== '' ? `AND status='${params.status}'` : ''}`;
  helper.doSql({
    sql,
    name: 'doGetList',
    callback,
  });
};

module.exports = ShopDepot;
