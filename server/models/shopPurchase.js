/**
 * @description 请购单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const ShopPurchase = function(item) {
  this.props = item.props;
};

/**
 * 获取物品列表，用于生成门店请购单
 */
ShopPurchase.prototype.doGetGoodsList = function(callback) {
  const sql = "select * from baseinfo_goods where status=1";
  helper.doSql({
    sql,
    name: "doGetGoodsList",
    callback
  });
};

/**
 * 获取门店列表，用于生成门店请购单
 */
ShopPurchase.prototype.doGetShopList = function(callback) {
  const sql = "select * from baseinfo_store where status=1";
  helper.doSql({
    sql,
    name: "doGetShopList",
    callback
  });
};

/**
 * 创建门店请购单，包含如下操作：
 * 1. 获取单据流水号
 * 2. 更新单据流水号
 * 3. 更新门店请购订单表，插入新数据
 * 4. 更新门店物品采购关系表，插入新数据，记录各个物品的请购数量
 */
ShopPurchase.prototype.doCreate = function(params, callback) {
  const date = helper.getDateString(new Date()); // 形同2019-03-03
  const fDate = helper.formatDateString(new Date()); // 形同20190303，用于插入在单号中
  const sql = `select MAX(number) as number from util_order_no where date='${date}' and type='pr'`;
  helper.doSql({
    sql,
    name: "getNo",
    callback: (error, res) => {
      const result = JSON.parse(JSON.stringify(res))[0].number;
      // 拿到当天的流水号中的最大值，如果不存在，本次使用流水号为0；如果存在，本次使用流水号为存在的最大值+1
      const no = result !== undefined && result !== null ? result + 1 : 0;

      // 更新流水号表
      const sqlParamsEntity = [];
      const updNo =
        "insert into util_order_no(number,date,type) values (?,?,?);";
      const param1 = [no, date, "pr"];
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updNo, param1));

      // 更新请购订单表
      const updOrder =
        "insert into store_purchase_order(order_no, create_time, status, amount, store_id, update_time) values (?,?,?,?,?,?)";
      const orderNo = `QG${fDate}${helper.formatNumString(no)}`;
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(updOrder, [
          orderNo,
          helper.getTimeString(new Date()),
          1,
          params.amount,
          params.storeId.storeId,
          helper.getTimeString(new Date())
        ])
      );

      // 更新物品列表
      params.goodsList.forEach(it => {
        const updGoods =
          "insert into relations_purchase_goods(order_no,goods_id,goods_count,goods_amount,type) values (?,?,?,?,?)";
        sqlParamsEntity.push(
          helper.getNewSqlParamEntity(updGoods, [
            orderNo,
            it.id,
            it.goodsCount,
            it.goodsAmount,
            "pr"
          ])
        );
      });

      helper.execTrans(sqlParamsEntity, (err, info) => {
        if (err) {
          console.error("事务执行失败", err);
        } else {
          console.log("事务执行成功", info);
          callback(err, info);
        }
      });
    }
  });
};

/**
 * 获取请购单列表
 */
ShopPurchase.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from store_purchase_order limit ${start},${params.rows}`;
  // const sql = `select * from store_purchase_order where order_no LIKE '%${
  //   params.orderNo
  // }%' ${params.status !== '' ? `AND status='${params.status}'` : ''}`;
  const sql = `SELECT
	store_purchase_order.id,
	store_purchase_order.order_no as orderNo,
	store_purchase_order.status,
	store_purchase_order.amount,
	store_purchase_order.create_time as createTime,
	store_purchase_order.update_time as updateTime,
	baseinfo_store.name AS storeName
  FROM store_purchase_order, baseinfo_store WHERE store_purchase_order.store_id = baseinfo_store.id ${
    params.orderNo !== ""
      ? `AND store_purchase_order.order_no LIKE '%${params.orderNo}%'`
      : ""
  } ${
    params.status !== ""
      ? `AND store_purchase_order.status='${params.status}'`
      : ""
  }`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

ShopPurchase.prototype.doEnable = function(params, callback) {
  const sql = `UPDATE store_purchase_order SET status='1' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: "doEnable",
    callback
  });
};

ShopPurchase.prototype.doDisable = function(params, callback) {
  const sql = `UPDATE store_purchase_order SET status='0' WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: "doDisable",
    callback
  });
};

ShopPurchase.prototype.doDelete = function(params, callback) {
  const sql = `DELETE FROM store_purchase_order WHERE id IN (${
    params.idsList
  })`;
  helper.doSql({
    sql,
    name: "doDisable",
    callback
  });
};

ShopPurchase.prototype.doUpdate = function(params, callback) {
  const sql = `UPDATE store_purchase_order SET name='${params.name}',unit='${
    params.unit
  }',unit_price='${params.unitPrice}' WHERE id=${params.id}`;
  helper.doSql({
    sql,
    name: "doUpdate",
    callback
  });
};

module.exports = ShopPurchase;
