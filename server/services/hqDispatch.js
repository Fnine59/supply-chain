/**
 * @description 配送单基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import HQDispatch from '../models/hqDispatch';
import helper from '../utils/helper';

module.exports = {
  init(app) {
    app.post('/hq/dispatch/getList', this.doGetList);
    app.post('/hq/dispatch/getDetail', this.doGetDetail);
    app.post('/hq/dispatch/update', this.doUpdate);
  },

  // 获取所有配送单信息
  doGetList(req, res) {
    const props = {};
    const dipatchOrder = new HQDispatch({ props });
    dipatchOrder.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询配送单成功',
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

  // 获取配送单据详情
  doGetDetail(req, res) {
    const props = {};
    const dipatchOrder = new HQDispatch({ props });
    dipatchOrder.doGetDetail(req.body, (err, data) => {
      const result = JSON.parse(JSON.stringify(data));
      console.log(result);
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询配送单据详情成功',
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

  // 更新配送单
  doUpdate(req, res) {
    const props = {};
    const dipatchOrder = new HQDispatch({ props });
    dipatchOrder.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '提交配送单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
