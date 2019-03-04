/**
 * @description 自采单基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import ShopSelfPurchase from '../models/shopSelfPurchase';
import helper from '../utils/helper';

module.exports = {
  init(app) {
    app.get('/shop/selfPurchase/getGoodsList', this.doGetGoodsList);
    app.get('/shop/selfPurchase/getShopList', this.doGetShopList);
    app.post('/shop/selfPurchase/create', this.doCreate);
    app.post('/shop/selfPurchase/getList', this.doGetList);
    app.post('/shop/selfPurchase/getDetail', this.doGetDetail);
    app.post('/shop/selfPurchase/delete', this.doDelete);
    app.post('/shop/selfPurchase/update', this.doUpdate);
    app.post('/shop/selfPurchase/withdraw', this.doWithdraw);
  },

  // 获取物品列表
  doGetGoodsList(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doGetGoodsList((err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询成功',
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

  // 获取门店列表
  doGetShopList(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doGetShopList((err, data) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询成功',
          data,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 新增自采单
  doCreate(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doCreate(req.body, (err, data) => {
      if (!err) {
        console.log('最终返回data', data);
        return res.send({
          code: 200,
          success: true,
          message: '新增自采单成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取所有自采单信息
  doGetList(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询自采单成功',
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

  // 获取自采单据详情
  doGetDetail(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doGetDetail(req.body, (err, data) => {
      const result = JSON.parse(JSON.stringify(data));
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询自采单据详情成功',
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

  // 删除自采单
  doDelete(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doDelete(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '删除自采单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 更新自采单
  doUpdate(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '提交自采单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 撤回已提交的自采单
  doWithdraw(req, res) {
    const props = {};
    const shopinfo = new ShopSelfPurchase({ props });
    shopinfo.doWithdraw(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '撤回自采单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
