/**
 * @description 自采单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const ShopSelfPurchase = function(item) {
  this.props = item.props;
};

/**
 * 获取物品列表，用于生成门店自采单
 */
ShopSelfPurchase.prototype.doGetGoodsList = function(callback) {
  const sql = "select * from baseinfo_goods where status=1";
  helper.doSql({
    sql,
    name: "doGetGoodsList",
    callback
  });
};

/**
 * 获取门店列表，用于生成门店自采单
 */
ShopSelfPurchase.prototype.doGetShopList = function(callback) {
  const sql = "select * from baseinfo_store where status=1";
  helper.doSql({
    sql,
    name: "doGetShopList",
    callback
  });
};

/**
 * 获取供应商列表，用于生成门店自采单
 */
ShopSelfPurchase.prototype.doGetSupplyList = function(callback) {
  const sql = "select * from baseinfo_supplier where status=1";
  helper.doSql({
    sql,
    name: "doGetSupplyList",
    callback
  });
};

/**
 * 创建门店自采单，包含如下操作：
 * 1. 获取单据流水号
 * 2. 更新单据流水号
 * 3. 更新门店自采订单表，插入新数据
 * 4. 更新门店物品采购关系表，插入新数据，记录各个物品的自采数量
 */
ShopSelfPurchase.prototype.doCreate = function(params, callback) {
  const date = helper.getDateString(new Date()); // 形同2019-03-03
  const fDate = helper.formatDateString(new Date()); // 形同20190303，用于插入在单号中
  const sql = `select MAX(number) as number from util_order_no where date='${date}' and type='sf'`;
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
      const param1 = [no, date, "sf"];
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updNo, param1));

      // 更新自采订单表
      const updOrder =
        "insert into store_self_purchase_order(order_no, supply_id, create_time, status, amount, store_id, update_time) values (?,?,?,?,?,?,?)";
      const orderNo = `ZC${fDate}${helper.formatNumString(no)}`;
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(updOrder, [
          orderNo,
          params.supplyId,
          helper.getTimeString(new Date()),
          1,
          params.amount,
          params.storeId,
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
            "sf"
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
 * 获取自采单列表
 */
ShopSelfPurchase.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from store_self_purchase_order limit ${start},${params.rows}`;
  const sql = `SELECT
	store_self_purchase_order.id,
	store_self_purchase_order.order_no as orderNo,
	store_self_purchase_order.status,
  store_self_purchase_order.amount,
  store_self_purchase_order.store_id as storeId,
  store_self_purchase_order.supply_id as supplyId,
	store_self_purchase_order.create_time as createTime,
	store_self_purchase_order.update_time as updateTime,
  baseinfo_store.name AS storeName,
  baseinfo_supplier.name AS supplyName
  FROM store_self_purchase_order, baseinfo_store, baseinfo_supplier 
  WHERE store_self_purchase_order.store_id = baseinfo_store.id 
  AND store_self_purchase_order.supply_id = baseinfo_supplier.id ${
    params.orderNo !== ""
      ? `AND store_self_purchase_order.order_no LIKE '%${params.orderNo}%'`
      : ""
  } ${
    params.status !== ""
      ? `AND store_self_purchase_order.status='${params.status}'`
      : ""
  }`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

// 获取自采单单据详情
ShopSelfPurchase.prototype.doGetDetail = function(params, callback) {
  const sql = `SELECT
	store_self_purchase_order.id,
	store_self_purchase_order.order_no as orderNo,
	store_self_purchase_order.status,
  store_self_purchase_order.amount,
  store_self_purchase_order.store_id as storeId,
  store_self_purchase_order.supply_id as supplyId,
	store_self_purchase_order.create_time as createTime,
	store_self_purchase_order.update_time as updateTime,
  baseinfo_store.name AS storeName,
  baseinfo_supplier.name AS supplyName
  FROM store_self_purchase_order, baseinfo_store, baseinfo_supplier 
  WHERE order_no='${params.orderNo}'
  AND store_self_purchase_order.store_id = baseinfo_store.id
  AND store_self_purchase_order.supply_id = baseinfo_supplier.id;

  SELECT
  baseinfo_goods.id,
  baseinfo_goods.name AS name,
  baseinfo_goods.unit AS unit,
  baseinfo_goods.unit_price AS unitPrice,
  relations_purchase_goods.id AS detailId,
	relations_purchase_goods.goods_count as goodsCount,
  relations_purchase_goods.goods_amount as goodsAmount
  FROM relations_purchase_goods, baseinfo_goods WHERE order_no='${
    params.orderNo
  }'
  AND relations_purchase_goods.goods_id = baseinfo_goods.id`;
  helper.doSqls({
    sql,
    name: "doGetDetail",
    callback
  });
};

// 删除单据
ShopSelfPurchase.prototype.doDelete = function(params, callback) {
  const sql = `DELETE FROM store_self_purchase_order WHERE order_no='${
    params.orderNo
  }';
  DELETE FROM relations_purchase_goods WHERE order_no='${params.orderNo}';`;
  helper.doSqls({
    sql,
    name: "doDelete",
    callback
  });
};

/**
 * 提交门店自采单，包含如下操作：
 * 1. 获取单据流水号用于生成总部订单
 * 2. 更新单据流水号
 * 3. 更新门店自采订单表及门店物品采购关系表，将用户的修改保留，并修改单据状态为已提交
 * 4. 更新总部订单表，生成新的订单
 */
ShopSelfPurchase.prototype.doUpdate = function(params, callback) {
  const date = helper.getDateString(new Date()); // 形同2019-03-03
  const fDate = helper.formatDateString(new Date()); // 形同20190303，用于插入在单号中
  const sql = `select MAX(number) as number from util_order_no where date='${date}' and type='fh'`;
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
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(updNo, [no, date, "fh"])
      );

      // 更新自采订单表，修改单据状态和单据状态更新时间
      const updOrder = `update store_self_purchase_order set status='2', amount='${
        params.amount
      }', update_time='${helper.getTimeString(new Date())}' where order_no='${
        params.orderNo
      }'`;
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updOrder, []));

      if (params.delIds.length > 0) {
        // 更新物品列表 —— 删除用户删除的数据
        const delGoods = `delete from relations_purchase_goods where id in (${
          params.delIds
        })`;
        sqlParamsEntity.push(helper.getNewSqlParamEntity(delGoods, []));
      }

      // 更新物品列表 —— 保存用户对数据的修改
      const changeList = params.goodsList.filter(it => it.detailId);
      changeList.forEach(it => {
        const updGoods = `update relations_purchase_goods set goods_count='${
          it.goodsCount
        }',goods_amount='${it.goodsAmount}' where id='${it.detailId}'`;
        sqlParamsEntity.push(helper.getNewSqlParamEntity(updGoods, []));
      });

      // 更新物品列表 —— 插入新数据
      const newList = params.goodsList.filter(it => !it.detailId);
      newList.forEach(it => {
        const insertGoods =
          "insert into relations_purchase_goods(order_no,goods_id,goods_count,goods_amount,type) values (?,?,?,?,?)";
        sqlParamsEntity.push(
          helper.getNewSqlParamEntity(insertGoods, [
            params.orderNo,
            it.id,
            it.goodsCount,
            it.goodsAmount,
            "sf"
          ])
        );
      });

      // 生成供应商订单
      const orderNo = `FH${fDate}${helper.formatNumString(no)}`;
      const addOrder =
        "insert into supplier_order(self_purchase_order_no,supply_id, store_id, order_no, status, create_time, update_time) values(?,?,?,?,?,?,?)";
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(addOrder, [
          params.orderNo,
          params.supplyId,
          params.storeId,
          orderNo,
          1,
          helper.getTimeString(new Date()),
          helper.getTimeString(new Date())
        ])
      );

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

// 撤回单据
ShopSelfPurchase.prototype.doWithdraw = function(params, callback) {
  const sql = `update store_self_purchase_order set status='4', update_time='${helper.getTimeString(
    new Date()
  )}' WHERE order_no='${params.orderNo}';
  update supplier_order set status='4', update_time='${helper.getTimeString(
    new Date()
  )}' WHERE self_purchase_order_no='${params.orderNo}';`;
  helper.doSqls({
    sql,
    name: "doWithdraw",
    callback
  });
};

module.exports = ShopSelfPurchase;
