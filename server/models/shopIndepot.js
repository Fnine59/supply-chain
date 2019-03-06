/**
 * @description 入库单表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 构造方法 */
const ShopIndepot = function(item) {
  this.props = item.props;
};

/**
 * 获取入库单列表
 */
ShopIndepot.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from store_in_depot limit ${start},${params.rows}`;
  const sql = `SELECT
      store_in_depot.id,
      store_in_depot.accept_order_no as acceptOrderNo,
      store_in_depot.type,
      store_in_depot.create_time as createTime,
      store_in_depot.store_id as storeId,
      baseinfo_store.name AS storeName,
      COUNT(DISTINCT store_in_depot.accept_order_no)
      FROM store_in_depot,baseinfo_store
      WHERE store_in_depot.store_id = baseinfo_store.id
      ${
        params.storeId !== ""
          ? `AND store_in_depot.store_id LIKE '%${params.storeId}%'`
          : ""
      }
      ${
        params.orderNo !== ""
          ? `AND store_in_depot.accept_order_no LIKE '%${params.orderNo}%'`
          : ""
      } GROUP BY store_in_depot.accept_order_no ORDER BY create_time desc`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

// 获取入库单单据详情
ShopIndepot.prototype.doGetDetail = function(params, callback) {
  const sql = `SELECT
	store_in_depot.id,
  store_in_depot.accept_order_no as acceptOrderNo,
  store_in_depot.type,
  store_in_depot.create_time as createTime,
  store_in_depot.store_id as storeId,
  baseinfo_store.name AS storeName
  FROM store_in_depot,baseinfo_store
  WHERE store_in_depot.accept_order_no='${params.orderNo}'
  AND store_in_depot.store_id = baseinfo_store.id;

  SELECT
  baseinfo_goods.name AS name,
  baseinfo_goods.unit AS unit,
  baseinfo_goods.unit_price AS unitPrice,
  relations_acceptance_goods.goods_id as goodsId,
	relations_acceptance_goods.accept_count as goodsCount,
  relations_acceptance_goods.accept_amt as goodsAmount
  FROM baseinfo_goods, relations_acceptance_goods
  WHERE relations_acceptance_goods.accept_order_no='${params.orderNo}'
  AND relations_acceptance_goods.goods_id = baseinfo_goods.id`;
  helper.doSqls({
    sql,
    name: "doGetDetail",
    callback
  });
};

module.exports = ShopIndepot;
