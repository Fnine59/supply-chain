/**
 * @description 验收单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const PurchaseAccept = function(item) {
  this.props = item.props;
};

/**
 * 获取验收单列表
 */
PurchaseAccept.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from store_acceptance_order limit ${start},${params.rows}`;
  const sql = `SELECT
      store_acceptance_order.id,
      store_acceptance_order.dispatch_order_no as dispatchOrderNo,
      store_acceptance_order.order_no as orderNo,
      store_acceptance_order.create_time as createTime,
      store_acceptance_order.update_time as updateTime,
      store_acceptance_order.status,
      store_acceptance_order.purchase_amount as purchaseAmount,
      store_acceptance_order.delivery_diff_amount as deliveryDiffAmount,
      store_acceptance_order.accept_amount as amount,
      store_acceptance_order.diff_amount as diffAmount,
      hq_order.dispatch_id as dispatchId,
      hq_order.store_id as storeId,
      baseinfo_store.name AS storeName,
      baseinfo_dispatch.name AS dispatchName
      FROM store_acceptance_order,hq_order,baseinfo_store,baseinfo_dispatch
      WHERE hq_order.dispatch_id = baseinfo_dispatch.id
      AND hq_order.store_id = baseinfo_store.id
      AND hq_order.order_no = store_acceptance_order.dispatch_order_no
      ${
        params.orderNo !== "" && params.orderNo !== undefined
          ? `AND store_acceptance_order.order_no LIKE '%${params.orderNo}%'`
          : ""
      } ${
    params.status !== ""
      ? `AND store_acceptance_order.status='${params.status}'`
      : ""
  } ORDER BY store_acceptance_order.create_time desc`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

// 获取验收单单据详情
PurchaseAccept.prototype.doGetDetail = function(params, callback) {
  const sql = `SELECT
	store_acceptance_order.id,
  store_acceptance_order.dispatch_order_no as dispatchOrderNo,
  store_acceptance_order.order_no as orderNo,
  store_acceptance_order.create_time as createTime,
  store_acceptance_order.update_time as updateTime,
  store_acceptance_order.status,
  store_acceptance_order.purchase_amount as purchaseAmount,
  store_acceptance_order.delivery_diff_amount as deliveryDiffAmount,
  store_acceptance_order.accept_amount as amount,
  store_acceptance_order.diff_amount as diffAmount,
  hq_order.dispatch_id as dispatchId,
  hq_order.store_id as storeId,
  baseinfo_store.name AS storeName,
  baseinfo_dispatch.name AS dispatchName
  FROM store_acceptance_order,hq_order,baseinfo_store,baseinfo_dispatch
  WHERE store_acceptance_order.order_no='${params.orderNo}'
  AND hq_order.dispatch_id = baseinfo_dispatch.id
  AND hq_order.store_id = baseinfo_store.id
  AND hq_order.order_no = store_acceptance_order.dispatch_order_no;

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
  relations_acceptance_goods.dispatch_diff_count as dispatchDiffCount,
  relations_acceptance_goods.dispatch_diff_amount as dispatchDiffAmount,
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
 * 1. 修改验收单据状态为已入库，更新单据状态更新时间，修改配送单表单据状态为已完成
 * 2. 更新供应商/总部物品验收关系表
 * 3. 更新入库流水记录
 * 4. 更新物品表中物品库存数量，进行入库
 */
PurchaseAccept.prototype.doUpdate = function(params, callback) {
  const time = helper.getTimeString(new Date());
  const sqlParamsEntity = [];
  
  // 更新验收订单表，修改单据状态和单据状态更新时间
  const updOrder = `update store_acceptance_order set status='2', accept_amount='${
    params.amount
  }', diff_amount='${
    params.diffAmount
  }', update_time='${time}' where order_no='${params.orderNo}'`;
  sqlParamsEntity.push(helper.getNewSqlParamEntity(updOrder, []));

  // 更新总部配送订单表，修改单据状态和单据状态更新时间
  const updPsOrder = `update hq_order set status='3',
   update_time='${time}' where order_no='${params.dispatchOrderNo}'`;
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
    const addIndepot = `insert into store_in_depot(accept_order_no,type,create_time,store_id) values(?,?,?,?);`;
    sqlParamsEntity.push(
      helper.getNewSqlParamEntity(addIndepot, [params.orderNo, "pr", time, params.storeId])
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

module.exports = PurchaseAccept;
