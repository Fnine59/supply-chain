/**
 * @description 物品表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2018-12-24
 */

import Goods from '../models/goods';

module.exports = {
  init(app) {
    app.get('/user', this.doGetTestAllItems);
  },
    // 获取所有用户信息
  doGetTestAllItems(req, res) {
    const props = {};
    const goods = new Goods({ props });
    goods.getTestAllItems((err, data) => {
      if (data.length) {
        return res.send({
          code: 200,
          data,
        });
      }
      console.log(err);
      return res.send({
        code: 500,
        message: '出错了',
      });
    });
  },
};
