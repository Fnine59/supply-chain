/**
 * @description 供应商基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import BaseInfoSupply from '../models/BaseInfoSupply';

module.exports = {
  init(app) {
    app.post('/baseinfo/supplyInfo/create', this.doCreate);
    app.post('/baseinfo/supplyInfo/getList', this.doGetList);
    app.post('/baseinfo/supplyInfo/enable', this.doEnable);
    app.post('/baseinfo/supplyInfo/disable', this.doDisable);
    app.post('/baseinfo/supplyInfo/delete', this.doDelete);
    app.post('/baseinfo/supplyInfo/update', this.doUpdate);
  },
  // 新增供应商
  doCreate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoSupply({ props });
    baseinfo.doCreate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '新增供应商成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取所有供应商信息
  doGetList(req, res) {
    const props = {};
    const baseinfo = new BaseInfoSupply({ props });
    baseinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询供应商成功',
          data,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 启用供应商
  doEnable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoSupply({ props });
    baseinfo.doEnable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '启用供应商成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 停用供应商
  doDisable(req, res) {
    const props = {};
    const baseinfo = new BaseInfoSupply({ props });
    baseinfo.doDisable(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '停用供应商成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 删除供应商
  doDelete(req, res) {
    const props = {};
    const baseinfo = new BaseInfoSupply({ props });
    baseinfo.doDelete(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '删除供应商成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },


  // 更新供应商
  doUpdate(req, res) {
    const props = {};
    const baseinfo = new BaseInfoSupply({ props });
    baseinfo.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '更新供应商信息成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
