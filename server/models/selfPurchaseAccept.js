/**
 * @description 验收单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const SelfPurchaseAccept = function(item) {
  this.props = item.props;
};

/**
 * 获取验收单列表
 */
SelfPurchaseAccept.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from store_self_acceptance_order limit ${start},${params.rows}`;
  const sql = `SELECT
      store_self_acceptance_order.id,
      store_self_acceptance_order.supplier_delivery_order_no as sendOrderNo,
      store_self_acceptance_order.order_no as orderNo,
      store_self_acceptance_order.create_time as createTime,
      store_self_acceptance_order.update_time as updateTime,
      store_self_acceptance_order.status,
      store_self_acceptance_order.amount,
      store_self_acceptance_order.diff_amount as diffAmount,
      store_self_acceptance_order.purchase_amount as purchaseAmount,
      supplier_order.supply_id as supplyId,
      supplier_order.store_id as storeId,
      baseinfo_store.name AS storeName,
      baseinfo_supplier.name AS supplyName
      FROM store_self_acceptance_order,supplier_order,baseinfo_store,baseinfo_supplier
      WHERE supplier_order.supply_id = baseinfo_supplier.id
      AND supplier_order.store_id = baseinfo_store.id
      AND supplier_order.order_no = store_self_acceptance_order.supplier_delivery_order_no
      ${
        params.orderNo !== ""
          ? `AND store_self_acceptance_order.order_no LIKE '%${params.orderNo}%'`
          : ""
      } ${
    params.status !== ""
      ? `AND store_self_acceptance_order.status='${params.status}'`
      : ""
  } ORDER BY create_time desc`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

// 获取验收单单据详情
SelfPurchaseAccept.prototype.doGetDetail = function(params, callback) {
  const sql = `SELECT
	store_self_acceptance_order.id,
  store_self_acceptance_order.supplier_delivery_order_no as sendOrderNo,
  store_self_acceptance_order.order_no as orderNo,
  store_self_acceptance_order.create_time as createTime,
  store_self_acceptance_order.update_time as updateTime,
  store_self_acceptance_order.status,
  store_self_acceptance_order.amount,
  store_self_acceptance_order.diff_amount as diffAmount,
  store_self_acceptance_order.purchase_amount as purchaseAmount,
  supplier_order.supply_id as supplyId,
  supplier_order.store_id as storeId,
  baseinfo_store.name AS storeName,
  baseinfo_supplier.name AS supplyName
  FROM store_self_acceptance_order,supplier_order,baseinfo_store,baseinfo_supplier
  WHERE store_self_acceptance_order.order_no='${params.orderNo}'
  AND supplier_order.supply_id = baseinfo_supplier.id
  AND supplier_order.store_id = baseinfo_store.id
  AND supplier_order.order_no = store_self_acceptance_order.supplier_delivery_order_no;

  SELECT
  baseinfo_goods.id,
  baseinfo_goods.name AS name,
  baseinfo_goods.unit AS unit,
  baseinfo_goods.unit_price AS unitPrice,
  relations_acceptance_goods.id AS detailId,
	relations_acceptance_goods.purchase_count as purchaseCount,
  relations_acceptance_goods.delivery_count as deliveryCount,
  relations_acceptance_goods.accept_count as acceptCount,
  relations_acceptance_goods.accept_amt as acceptAmount,
  relations_acceptance_goods.send_diff_count as sendDiffCount,
  relations_acceptance_goods.send_diff_amount as sendDiffAmount
  FROM relations_acceptance_goods, baseinfo_goods
  WHERE relations_acceptance_goods.accept_order_no='${params.orderNo}'
  AND relations_acceptance_goods.goods_id = baseinfo_goods.id`;
  helper.doSqls({
    sql,
    name: "doGetDetail",
    callback
  });
};

/**
 * 提交验收单，包含如下操作：
 * 1. 修改验收单据状态为已入库，更新单据状态更新时间，更新供应商发货订单表状态为已完成，并更新时间
 * 2. 更新供应商/总部物品验收关系表
 * 3. 更新入库流水记录
 * 4. 更新物品表中物品库存数量，进行入库
 */
SelfPurchaseAccept.prototype.doUpdate = function(params, callback) {
  const time = helper.getTimeString(new Date());
  const sqlParamsEntity = [];
  
  // 更新验收订单表，修改单据状态和单据状态更新时间
  const updOrder = `update store_self_acceptance_order set status='2', amount='${
    params.amount
  }', diff_amount='${
    params.diffAmount
  }', update_time='${time}' where order_no='${params.orderNo}'`;
  sqlParamsEntity.push(helper.getNewSqlParamEntity(updOrder, []));
  
  // 更新供应商发货订单表，修改单据状态和单据状态更新时间
  const updPsOrder = `update supplier_order set status='3',
   update_time='${time}' where order_no='${params.sendOrderNo}'`;
  sqlParamsEntity.push(helper.getNewSqlParamEntity(updPsOrder, []));

  // 更新物品列表 —— 保存用户对数据的修改
  params.goodsList.forEach(it => {
    const updGoods = `update relations_acceptance_goods set accept_count='${
      it.acceptCount
    }',accept_amt='${it.acceptAmount}',send_diff_count='${
      it.sendDiffCount
    }',send_diff_amount='${it.sendDiffAmount}' where id='${it.detailId}'`;
    sqlParamsEntity.push(helper.getNewSqlParamEntity(updGoods, []));
  });

  // 更新入库记录表
  params.goodsList.forEach(it => {
    const addIndepot = `insert into store_in_depot(accept_order_no,type,create_time, store_id) values(?,?,?,?);`;
    sqlParamsEntity.push(
      helper.getNewSqlParamEntity(addIndepot, [params.orderNo, "sf", time, params.storeId])
    );
  });

  // 更新物品库存表 —— 增加库存
  params.goodsList.forEach(it => {
    const updGoods = `insert into store_depots(goods_id,store_id,depot_count) values(?,?,?)
    ON DUPLICATE KEY update depot_count=depot_count + ${it.acceptCount}`;
    sqlParamsEntity.push(helper.getNewSqlParamEntity(updGoods, [
      it.id,
      params.storeId,
      it.acceptCount
    ]));
  });

  helper.execTrans(sqlParamsEntity, (err, info) => {
    if (err) {
      console.error("事务执行失败", err);
    } else {
      console.log("事务执行成功", info);
      callback(err, info);
    }
  });
};

module.exports = SelfPurchaseAccept;
