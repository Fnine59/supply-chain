/**
 * @description 基础信息表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-14
 */

import BaseInfo from '../models/baseinfo';

module.exports = {
  init(app) {
    app.post('/baseinfo/createShop', this.doCreateShop);
    app.post('/baseinfo/getShopList', this.doGetShopList);
  },
  // 新增门店
  doCreateShop(req, res) {
    const props = {};
    const baseinfo = new BaseInfo({ props });
    baseinfo.doCreateShop(req.body, (err) => {
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

  // 获取所有用户信息
  doGetShopList(req, res) {
    console.log('req', req);
    const props = {};
    const baseinfo = new BaseInfo({ props });
    baseinfo.doGetShopList(req.body, (err, data) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '注册成功',
          data,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
