/**
 * @description 验收单基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import SelfPurchaseAccept from '../models/selfPurchaseAccept';
import helper from '../utils/helper';

module.exports = {
  init(app) {
    app.post('/shop/selfPurchaseAccept/getList', this.doGetList);
    app.post('/shop/selfPurchaseAccept/getDetail', this.doGetDetail);
    app.post('/shop/selfPurchaseAccept/update', this.doUpdate);
  },

  // 获取所有验收单信息
  doGetList(req, res) {
    const props = {};
    const shop = new SelfPurchaseAccept({ props });
    shop.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询验收单成功',
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

  // 获取验收单据详情
  doGetDetail(req, res) {
    const props = {};
    const shop = new SelfPurchaseAccept({ props });
    shop.doGetDetail(req.body, (err, data) => {
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询验收单据详情成功',
          data: {
            ...result[0][0],
            createTime: helper.getTimeString(new Date(result[0][0].createTime)),
            updateTime: helper.getTimeString(new Date(result[0][0].updateTime)),
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

  // 更新验收单
  doUpdate(req, res) {
    const props = {};
    const shop = new SelfPurchaseAccept({ props });
    shop.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '提交验收单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
