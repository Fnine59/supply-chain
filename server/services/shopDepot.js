/**
 * @description 物品基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import ShopDepot from '../models/shopDepot';

module.exports = {
  init(app) {
    app.post('/shop/depot/getList', this.doGetList);
  },

  // 获取物品库存列表
  doGetList(req, res) {
    const props = {};
    const baseinfo = new ShopDepot({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询物品成功',
          data,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
