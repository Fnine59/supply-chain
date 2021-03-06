/**
 * @description 请购单基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-24
 */

import ShopPurchase from '../models/shopPurchase';
import helper from '../utils/helper';

module.exports = {
  init(app) {
    app.get('/shop/purchase/getGoodsList', this.doGetGoodsList);
    app.get('/shop/purchase/getShopList', this.doGetShopList);
    app.get('/shop/purchase/getDispatchList', this.doGetDispatchList);
    app.post('/shop/purchase/create', this.doCreate);
    app.post('/shop/purchase/getList', this.doGetList);
    app.post('/shop/purchase/getDetail', this.doGetDetail);
    app.post('/shop/purchase/delete', this.doDelete);
    app.post('/shop/purchase/update', this.doUpdate);
    app.post('/shop/purchase/withdraw', this.doWithdraw);
  },

  // 获取物品列表
  doGetGoodsList(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
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
    const shopinfo = new ShopPurchase({ props });
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

  // 获取配送中心列表
  doGetDispatchList(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doGetDispatchList((err, data) => {
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

  // 新增请购单
  doCreate(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doCreate(req.body, (err, data) => {
      if (!err) {
        console.log('最终返回data', data);
        return res.send({
          code: 200,
          success: true,
          message: '新增请购单成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 获取所有请购单信息
  doGetList(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doGetList(req.body, (err, data) => {
      if (!err) {
        const result = JSON.parse(JSON.stringify(data));
        return res.send({
          code: 200,
          success: true,
          message: '查询请购单成功',
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

  // 获取请购单据详情
  doGetDetail(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doGetDetail(req.body, (err, data) => {
      const result = JSON.parse(JSON.stringify(data));
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '查询请购单据详情成功',
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

  // 删除请购单
  doDelete(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doDelete(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '删除请购单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 更新请购单
  doUpdate(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doUpdate(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '提交请购单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },

  // 撤回已提交的请购单
  doWithdraw(req, res) {
    const props = {};
    const shopinfo = new ShopPurchase({ props });
    shopinfo.doWithdraw(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '撤回请购单成功',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
