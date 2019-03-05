/**
 * @description 发货单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const SendGoods = function(item) {
  this.props = item.props;
};

/**
 * 获取发货单列表
 */
SendGoods.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from supplier_order limit ${start},${params.rows}`;
  const sql = `SELECT
      supplier_order.id,
      supplier_order.self_purchase_order_no as selfPurchaseOrderNo,
      supplier_order.supply_id as supplyId,
      supplier_order.store_id as storeId,
      supplier_order.order_no as orderNo,
      supplier_order.status,
      supplier_order.create_time as createTime,
      supplier_order.update_time as updateTime,
      supplier_order.amount,
      baseinfo_store.name AS storeName,
      baseinfo_supplier.name AS supplyName
      FROM supplier_order,baseinfo_store,baseinfo_supplier
      WHERE supplier_order.supply_id = baseinfo_supplier.id
      AND supplier_order.store_id = baseinfo_store.id
      ${
        params.orderNo !== ""
          ? `AND supplier_order.order_no LIKE '%${params.orderNo}%'`
          : ""
      } ${
    params.status !== "" ? `AND supplier_order.status='${params.status}'` : ""
  }`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

// 获取发货单单据详情
SendGoods.prototype.doGetDetail = function(params, callback) {
  const sql = `SELECT
	supplier_order.id,
  supplier_order.self_purchase_order_no as selfPurchaseOrderNo,
  supplier_order.supply_id as supplyId,
  supplier_order.store_id as storeId,
  supplier_order.order_no as orderNo,
  supplier_order.status,
  supplier_order.create_time as createTime,
  supplier_order.update_time as updateTime,
  supplier_order.amount,
  baseinfo_store.name AS storeName,
  baseinfo_supplier.name AS supplyName
  FROM supplier_order,baseinfo_store,baseinfo_supplier
  WHERE order_no='${params.orderNo}'
  AND supplier_order.store_id = baseinfo_store.id
  AND supplier_order.supply_id = baseinfo_supplier.id;

  SELECT
  baseinfo_goods.name AS name,
  baseinfo_goods.unit AS unit,
  baseinfo_goods.unit_price AS unitPrice,
	relations_purchase_goods.goods_count as goodsCount,
  relations_purchase_goods.goods_amount as goodsAmount,
  relations_delivery_goods.id AS detailId,
  relations_delivery_goods.goods_id AS id,
  relations_delivery_goods.count AS sendGoodsCount,
  relations_delivery_goods.goods_amount AS sendGoodsAmount
  FROM relations_purchase_goods, baseinfo_goods, relations_delivery_goods
  WHERE relations_purchase_goods.order_no='${params.selfPurchaseOrderNo}'
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
 * 提交发货单，包含如下操作：
 * 1. 获取单据流水号用于生成门店验收单
 * 2. 更新单据流水号
 * 3. 更新供应商/总部物品发货关系表
 * 4. 修改发货单据状态为已提交，修改门店自采单据状态为已完成
 * 5. 更新门店验收订单表，生成新的订单
 * 6. 更新门店验收物品关系表
 */
SendGoods.prototype.doUpdate = function(params, callback) {
  const date = helper.getDateString(new Date()); // 形同2019-03-03
  const fDate = helper.formatDateString(new Date()); // 形同20190303，用于插入在单号中
  const time = helper.getTimeString(new Date());
  const sql = `select MAX(number) as number from util_order_no where date='${date}' and type='sfys'`;
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
        helper.getNewSqlParamEntity(updNo, [no, date, "sfys"])
      );

      // 更新发货订单表，修改单据状态和单据状态更新时间
      const updOrder = `update supplier_order set status='2', amount='${
        params.amount
      }', update_time='${time}' where order_no='${params.orderNo}'`;
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updOrder, []));

      // 更新门店自采订单表，修改单据状态和单据状态更新时间
      const updSfOrder = `update store_self_purchase_order set status='3',
       update_time='${time}' where order_no='${params.selfPurchaseOrderNo}'`;
      sqlParamsEntity.push(helper.getNewSqlParamEntity(updSfOrder, []));

      // 更新物品列表 —— 保存用户对数据的修改
      params.goodsList.forEach(it => {
        const updGoods = `update relations_delivery_goods set count='${
          it.sendGoodsCount
        }',goods_amount='${it.sendGoodsAmount}'
        where id='${it.detailId}'`;
        sqlParamsEntity.push(helper.getNewSqlParamEntity(updGoods, []));
      });

      // 生成门店自采验收订单
      const orderNo = `ZY${fDate}${helper.formatNumString(no)}`;
      const addOrder = `insert into store_self_acceptance_order(supplier_delivery_order_no, order_no,
          create_time, update_time,status,purchase_amount) values(?,?,?,?,?,?)`;
      sqlParamsEntity.push(
        helper.getNewSqlParamEntity(addOrder, [
          params.orderNo,
          orderNo,
          time,
          time,
          1,
          params.amount
        ])
      );

      params.goodsList.forEach(it => {
        const addGoods = `insert into relations_acceptance_goods(goods_id,accept_order_no,type,
          purchase_count,delivery_count) values(?,?,?,?,?);`;
        sqlParamsEntity.push(
          helper.getNewSqlParamEntity(addGoods, [
            it.id,
            orderNo,
            "sf",
            it.goodsCount,
            it.sendGoodsCount
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

module.exports = SendGoods;
