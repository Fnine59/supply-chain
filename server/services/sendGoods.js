/**
 * @description 发货单基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import SendGoods from '../models/sendGoods';
import helper from '../utils/helper';

module.exports = {
  init(app) {
    app.post('/supply/sendGoods/getList', this.doGetList);
    app.post('/supply/sendGoods/getDetail', this.doGetDetail);
    app.post('/supply/sendGoods/update', this.doUpdate);
  },

  // 获取所有发货单信息
  doGetList(req, res) {
    const props = {};
    const sendOrder = new SendGoods({ props });
    sendOrder.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询发货单成功',
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

  // 获取发货单据详情
  doGetDetail(req, res) {
    const props = {};
    const sendOrder = new SendGoods({ props });
    sendOrder.doGetDetail(req.body, (err, data) => {
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询发货单据详情成功',
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

  // 更新发货单
  doUpdate(req, res) {
    const props = {};
    const sendOrder = new SendGoods({ props });
    sendOrder.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '提交发货单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
