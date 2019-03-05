/**
 * @description 配送单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const HQDispatch = function(item) {
  this.props = item.props;
};

/**
 * 获取配送单列表
 */
HQDispatch.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from hq_order limit ${start},${params.rows}`;
  const sql = `SELECT
      hq_order.id,
      hq_order.purchase_order_no as purchaseOrderNo,
      hq_order.order_no as orderNo,
      hq_order.dispatch_id as dispatchId,
      hq_order.store_id as storeId,
      hq_order.status,
      hq_order.amount,
      hq_order.diff_amount as diffAmount,
      hq_order.create_time as createTime,
      hq_order.update_time as updateTime,
      baseinfo_store.name AS storeName,
      baseinfo_dispatch.name AS dispatchName
      FROM hq_order,baseinfo_store,baseinfo_dispatch
      WHERE hq_order.dispatch_id = baseinfo_dispatch.id
      AND hq_order.store_id = baseinfo_store.id
      ${
        params.orderNo !== ""
          ? `AND hq_order.order_no LIKE '%${params.orderNo}%'`
          : ""
      } ${
    params.status !== "" ? `AND hq_order.status='${params.status}'` : ""
  }`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

// 获取配送单单据详情
HQDispatch.prototype.doGetDetail = function(params, callback) {
  const sql = `SELECT
	hq_order.id,
	hq_order.order_no as orderNo,
  hq_order.purchase_order_no as purchaseOrderNo,
	hq_order.status,
  hq_order.amount,
  hq_order.diff_amount as diffAmount,
  hq_order.store_id as storeId,
  hq_order.dispatch_id as dispatchId,
	hq_order.create_time as createTime,
	hq_order.update_time as updateTime,
	baseinfo_store.name AS storeName,
	baseinfo_dispatch.name AS dispatchName
  FROM hq_order, baseinfo_store, baseinfo_dispatch WHERE order_no='${
    params.orderNo
  }'
  AND hq_order.store_id = baseinfo_store.id
  AND hq_order.dispatch_id = baseinfo_dispatch.id;

  SELECT
  baseinfo_goods.id,
  baseinfo_goods.name AS name,
  baseinfo_goods.unit AS unit,
  baseinfo_goods.unit_price AS unitPrice,
	relations_purchase_goods.goods_count as goodsCount,
  relations_purchase_goods.goods_amount as goodsAmount,
  relations_delivery_goods.id AS detailId,
  relations_delivery_goods.count as dispatchGoodsCount,
  relations_delivery_goods.goods_amount as dispatchGoodsAmount,
  relations_delivery_goods.diff_count as dispatchGoodsDiffCount,
  relations_delivery_goods.diff_amt as dispatchGoodsDiffAmount
  FROM relations_purchase_goods, baseinfo_goods, relations_delivery_goods
  WHERE relations_purchase_goods.order_no='${params.purchaseOrderNo}'
  AND relations_delivery_goods.delivery_order_no = '${params.orderNo}'
  AND relations_purchase_goods.goods_id = relations_delivery_goods.goods_id
  AND relations_purchase_goods.goods_id = baseinfo_goods.id`;
  helper.doSqls({
    sql,
    name: "doGetDetail",
    callback
  });
};

/**
 * 提交配送单，包含如下操作：
 * 1. 获取单据流水号用于生成门店验收单
 * 2. 更新单据流水号
 * 3. 更新供应商/总部物品配送关系表
 * 4. 修改配送单据状态为已提交，修改门店请购单状态为已完成
 * 5. 更新门店验收订单表，生成新的订单
 * 6. 更新门店验收物品关系表
 */
HQDispatch.prototype.doUpdate = function(params, callback) {
  const date = helper.getDateString(new Date()); // 形同2019-03-03
  const fDate = helper.formatDateString(new Date()); // 形同20190303，用于插入在单号中
  const time = helper.getTimeString(new Date());
  const sql = `select MAX(number) as number from util_order_no where date='${date}' and type='prys'`;
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
        helper.getNewSqlParamEntity(updNo, [no, date, "prys"])
      );

      // 更新配送订单表，修改单据状态和单据状态更新时间
      const updOrder = `update hq_order set status='2', amount='${
        params.amount
      }', diff_amount='${
        params.diffAmount
      }', update_time='${time}' where order_no='${
        params.orderNo
      }'`;
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updOrder, []));

      // 更新门店请购单，修改单据状态为已完成
      const updPrOrder = `update store_purchase_order set status='3', update_time='${time}'
      where order_no='${
        params.purchaseOrderNo
      }'`;
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updPrOrder, []));

      // 更新物品列表 —— 保存用户对数据的修改
      params.goodsList.forEach(it => {
        const updGoods = `update relations_delivery_goods set count='${
          it.dispatchGoodsCount
        }',goods_amount='${it.dispatchGoodsAmount}',diff_count='${
          it.dispatchGoodsDiffCount
        }',diff_amt='${it.dispatchGoodsDiffAmount}' where id='${it.detailId}'`;
        sqlParamsEntity.push(helper.getNewSqlParamEntity(updGoods, []));
      });

      // 生成门店请购验收订单
      const orderNo = `QY${fDate}${helper.formatNumString(no)}`;
      const addOrder = `insert into store_acceptance_order(dispatch_order_no, order_no, create_time, update_time,
           status, purchase_amount, delivery_diff_amount) values(?,?,?,?,?,?,?)`;
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(addOrder, [
          params.orderNo,
          orderNo,
          time,
          time,
          1,
          params.amount + params.diffAmount,
          params.diffAmount
        ])
      );

      params.goodsList.forEach(it => {
        const addGoods = `insert into relations_acceptance_goods(goods_id,accept_order_no,type,
          purchase_count,delivery_count,dispatch_diff_count,dispatch_diff_amount) values(?,?,?,?,?,?,?);`;
        sqlParamsEntity.push(
          helper.getNewSqlParamEntity(addGoods, [
            it.id,
            orderNo,
            "pr",
            it.goodsCount,
            it.dispatchGoodsCount,
            it.dispatchGoodsDiffCount,
            it.dispatchGoodsDiffAmount
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

module.exports = HQDispatch;
