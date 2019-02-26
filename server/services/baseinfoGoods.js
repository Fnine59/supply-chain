/**
 * @description 物品基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import BaseInfoGoods from '../models/BaseInfoGoods';

module.exports = {
  init(app) {
    app.post('/baseinfo/goodsInfo/create', this.doCreate);
    app.post('/baseinfo/goodsInfo/getList', this.doGetList);
    app.post('/baseinfo/goodsInfo/enable', this.doEnable);
    app.post('/baseinfo/goodsInfo/disable', this.doDisable);
    app.post('/baseinfo/goodsInfo/delete', this.doDelete);
    app.post('/baseinfo/goodsInfo/update', this.doUpdate);
  },
  // 新增物品
  doCreate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoGoods({ props });
    baseinfo.doCreate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '新增物品成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取所有物品信息
  doGetList(req, res) {
    const props = {};
    const baseinfo = new BaseInfoGoods({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询物品成功',
          data: result.map(item => ({
            ...item,
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

  // 启用物品
  doEnable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoGoods({ props });
    baseinfo.doEnable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '启用物品成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 停用物品
  doDisable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoGoods({ props });
    baseinfo.doDisable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '停用物品成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 删除物品
  doDelete(req, res) {
    const props = {};
    const baseinfo = new BaseInfoGoods({ props });
    baseinfo.doDelete(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '删除物品成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 更新物品
  doUpdate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoGoods({ props });
    baseinfo.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '更新物品信息成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
