/**
 * @description 物品表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2018-12-24
 */

import helper from '../utils/helper';

/* 物品模块 构造方法*/
const Goods = function (goods) {
  this.props = goods.props;
};

/* 获取全部数据,测试接口使用，正式上线时请关闭*/
Goods.prototype.getTestAllItems = function (callback) {
  const sql = 'select * from baseinfo_user';
  helper.doSql({
    sql,
    name: 'getTestAllItems',
    callback,
  });
};

module.exports = Goods;
