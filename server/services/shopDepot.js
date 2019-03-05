/**
 * @description 物品基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import ShopDepot from '../models/ShopDepot';

module.exports = {
  init(app) {
    app.post('/shop/depot/getList', this.doGetList);
    app.post('/shop/depot/getDetail', this.doGetDetail);
  },

  // 获取入库信息列表
  doGetList(req, res) {
    const props = {};
    const baseinfo = new ShopDepot({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询物品成功',
          data: result.map(item => ({
            id: item.id,
            name: item.name,
            unit: item.unit,
            status: item.status,
            unitPrice: item.unit_price,
          })),
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取入库记录详细信息
  doGetDetail(req, res) {
    const props = {};
    const baseinfo = new ShopDepot({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询物品成功',
          data: result.map(item => ({
            id: item.id,
            name: item.name,
            unit: item.unit,
            status: item.status,
            unitPrice: item.unit_price,
          })),
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
