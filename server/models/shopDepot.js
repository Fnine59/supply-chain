/**
 * @description 物品基础信息表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from '../utils/helper';

/* 基础信息模块 构造方法*/
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

// 获取发货单单据详情
ShopDepot.prototype.doGetDetail = function (params, callback) {
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
    name: 'doGetDetail',
    callback,
  });
};

module.exports = ShopDepot;
