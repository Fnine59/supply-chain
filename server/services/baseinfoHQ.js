/**
 * @description 配送中心基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import BaseInfoHQ from '../models/BaseInfoHQ';

module.exports = {
  init(app) {
    app.post('/baseinfo/hqinfo/create', this.doCreate);
    app.post('/baseinfo/hqinfo/getList', this.doGetList);
    app.post('/baseinfo/hqinfo/enable', this.doEnable);
    app.post('/baseinfo/hqinfo/disable', this.doDisable);
    app.post('/baseinfo/hqinfo/delete', this.doDelete);
    app.post('/baseinfo/hqinfo/update', this.doUpdate);
  },
  // 新增配送中心
  doCreate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoHQ({ props });
    baseinfo.doCreate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '新增配送中心成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取所有配送中心信息
  doGetList(req, res) {
    const props = {};
    const baseinfo = new BaseInfoHQ({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询配送中心成功',
          data,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 启用配送中心
  doEnable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoHQ({ props });
    baseinfo.doEnable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '启用配送中心成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 停用配送中心
  doDisable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoHQ({ props });
    baseinfo.doDisable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '停用配送中心成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 删除配送中心
  doDelete(req, res) {
    const props = {};
    const baseinfo = new BaseInfoHQ({ props });
    baseinfo.doDelete(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '删除配送中心成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },


  // 更新配送中心
  doUpdate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoHQ({ props });
    baseinfo.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '更新配送中心信息成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
