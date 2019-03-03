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
  const sql = 'select * from baseinfo_store where status=1';
  helper.doSql({
    sql,
    name: 'doGetShopList',
    callback,
  });
};

ShopPurchase.prototype.doCreate = function (params, callback) {
  const date = helper.getDateString(new Date());
  const fDate = helper.formatDateString(new Date());
  const sql = `select MAX(number) as number from util_order_no where date='${date}' and type='pr'`;
  helper.doSql({
    sql,
    name: 'getNo',
    callback: (error, res) => {
      const result = JSON.parse(JSON.stringify(res))[0].number;
      const no = result !== undefined && result !== null ? result + 1 : 0;

      const sqlParamsEntity = [];
      const updNo = 'insert into util_order_no(number,date,type) values (?,?,?);';
      const param1 = [no, date, 'pr'];
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updNo, param1));

      const updOrder =
        'insert into store_purchase_order(order_no, create_time, status, amount, store_id, update_time) values (?,?,?,?,?,?)';
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(updOrder, [
          `QG${fDate}${helper.formatNumString(no)}`,
          helper.getTimeString(new Date()),
          1,
          params.amount,
          params.storeId.storeId,
          helper.getTimeString(new Date()),
        ]),
      );

      helper.execTrans(sqlParamsEntity, (err, info) => {
        if (err) {
          console.error('事务执行失败', err);
        } else {
          console.log('done.', info);
          callback(err, info);
        }
      });
    },
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
