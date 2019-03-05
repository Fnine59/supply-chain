/**
 * @description 入库流水单基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import ShopIndepot from '../models/shopIndepot';
import helper from '../utils/helper';

module.exports = {
  init(app) {
    app.post('/shop/indepot/getList', this.doGetList);
    app.post('/shop/indepot/getDetail', this.doGetDetail);
  },

  // 获取所有入库流水单信息
  doGetList(req, res) {
    const props = {};
    const shopinfo = new ShopIndepot({ props });
    shopinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询入库流水单成功',
          data: result.map(item => ({
            ...item,
            createTime: helper.getTimeString(new Date(item.createTime)),
            updateTime: helper.getTimeString(new Date(item.updateTime)),
          })),
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取入库流水单据详情
  doGetDetail(req, res) {
    const props = {};
    const shopinfo = new ShopIndepot({ props });
    shopinfo.doGetDetail(req.body, (err, data) => {
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询入库流水单据详情成功',
          data: {
            ...result[0][0],
            createTime: helper.getTimeString(new Date(result[0][0].createTime)),
            goodsList: result[1],
          },
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
