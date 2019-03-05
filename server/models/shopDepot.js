/**
 * @description 门店库存表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */
/* eslint-disable */
import helper from "../utils/helper";

/* 门店库存模块 构造方法*/
const ShopDepot = function(item) {
  this.props = item.props;
};

ShopDepot.prototype.doGetList = function(params, callback) {
  // const start = (params.page - 1) * params.rows;
  // const sql = `select * from baseinfo_goods limit ${start},${params.rows}`;
  const sql = `SELECT 
  store_depots.goods_id as goodsId,
  store_depots.store_id as storeId,
  store_depots.depot_count as depotCount,
  baseinfo_store.name as storeName,
  baseinfo_goods.name as goodsName,
  baseinfo_goods.unit as unit,
  baseinfo_goods.unit_price as unitPrice,
  baseinfo_goods.status
  FROM store_depots, baseinfo_store, baseinfo_goods
  WHERE store_depots.store_id = baseinfo_store.id
  AND store_depots.goods_id = baseinfo_goods.id
  AND baseinfo_goods.name LIKE '%${params.name || ""}%' ${
    params.status !== "" ? `AND baseinfo_goods.status='${params.status}'` : ""
  } ${params.storeId !== "" ? `AND store_depots.store_id='${params.storeId}'` : ""}`;
  helper.doSql({
    sql,
    name: "doGetList",
    callback
  });
};

module.exports = ShopDepot;
