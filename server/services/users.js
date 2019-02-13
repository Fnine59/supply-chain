/**
 * @description 用户表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-13
 */

import Users from '../models/users';

module.exports = {
  init(app) {
    app.post('/login', this.doLogin);
  },
  // 获取所有用户信息
  doLogin(req, res) {
    const props = {};
    const users = new Users({ props });
    users.doLogin(req.body, (err, data) => {
      console.log('data', data);
      console.log('err', err);
      if (!err) {
        if (data.length > 0) {
          return res.send({
            code: 200,
            success: true,
            message: '登录成功',
            data,
          });
        }
        return res.send({
          code: 1001,
          success: true,
          message: '用户不存在或密码错误',
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
