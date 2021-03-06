/**
 * @description 门店基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-14
 */

import BaseInfoShop from '../models/baseinfoShop';

module.exports = {
  init(app) {
    app.post('/baseinfo/shopinfo/create', this.doCreate);
    app.post('/baseinfo/shopinfo/getList', this.doGetList);
    app.post('/baseinfo/shopinfo/enable', this.doEnable);
    app.post('/baseinfo/shopinfo/disable', this.doDisable);
    app.post('/baseinfo/shopinfo/delete', this.doDelete);
    app.post('/baseinfo/shopinfo/update', this.doUpdate);
  },
  // 新增门店
  doCreate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoShop({ props });
    baseinfo.doCreate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '新增门店成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取所有门店信息
  doGetList(req, res) {
    const props = {};
    const baseinfo = new BaseInfoShop({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询门店成功',
          data,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 启用门店
  doEnable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoShop({ props });
    baseinfo.doEnable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '启用门店成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 停用门店
  doDisable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoShop({ props });
    baseinfo.doDisable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '停用门店成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 删除门店
  doDelete(req, res) {
    const props = {};
    const baseinfo = new BaseInfoShop({ props });
    baseinfo.doDelete(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '删除门店成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },


  // 更新门店
  doUpdate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoShop({ props });
    baseinfo.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '更新门店信息成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
