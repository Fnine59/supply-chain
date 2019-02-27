/**
 * @description 请购单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import helper from '../utils/helper';

/* 构造方法 */
const ShopPurchase = function (item) {
  this.props = item.props;
};

ShopPurchase.prototype.doGetGoodsList = function (callback) {
  const sql = 'select * from baseinfo_goods where status=1';
  helper.doSql({
    sql,
    name: 'doGetGoodsList',
    callback,
  });
};

ShopPurchase.prototype.doGetShopList = function (callback) {
  const sql = 'select * from baseinfo_store';
  helper.doSql({
    sql,
    name: 'doGetShopList',
    callback,
  });
};


ShopPurchase.prototype.doCreate = function (params, callback) {
  const sql =
    'INSERT INTO store_purchase_order(unit,name,status,unit_price) VALUES(?,?,?,?)';
  const sqlParams = [params.unit, params.name, params.status, params.unitPrice];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doCreate',
    callback,
  });
};

ShopPurchase.prototype.doGetList = function (params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from store_purchase_order limit ${start},${params.rows}`;
  const sql = `select * from store_purchase_order where order_no LIKE '%${
    params.orderNo
  }%' ${params.status !== '' ? `AND status='${params.status}'` : ''}`;
  helper.doSql({
    sql,
    name: 'doGetList',
    callback,
  });
};

ShopPurchase.prototype.doEnable = function (params, callback) {
  const sql = `UPDATE store_purchase_order SET status='1' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doEnable',
    callback,
  });
};

ShopPurchase.prototype.doDisable = function (params, callback) {
  const sql = `UPDATE store_purchase_order SET status='0' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

ShopPurchase.prototype.doDelete = function (params, callback) {
  const sql = `DELETE FROM store_purchase_order WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: 'doDisable',
    callback,
  });
};

ShopPurchase.prototype.doUpdate = function (params, callback) {
  const sql = `UPDATE store_purchase_order SET name='${params.name}',unit='${
    params.unit
  }',unit_price='${params.unitPrice}' WHERE id=${params.id}`;
  helper.doSql({
    sql,
    name: 'doUpdate',
    callback,
  });
};

module.exports = ShopPurchase;
