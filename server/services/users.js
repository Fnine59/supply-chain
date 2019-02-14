/**
 * @description 用户表控制层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-13
 */

import Users from '../models/users';

module.exports = {
  init(app) {
    app.post('/login', this.doLogin);
    app.post('/register', this.doRegister);
  },
  // 获取所有用户信息
  doLogin(req, res) {
    const props = {};
    const users = new Users({ props });
    users.doLogin(req.body, (err, data) => {
      if (!err) {
        if (data.length > 0) {
          return res.send({
            code: 200,
            success: true,
            message: '登录成功',
            data: {
              id: data[0].id,
              username: data[0].user_name,
              password: data[0].password,
              nickname: data[0].nickname,
            },
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

  // 获取所有用户信息
  doRegister(req, res) {
    const props = {};
    const users = new Users({ props });
    users.doRegister(req.body, (err) => {
      if (!err) {
        return res.send({
          code: 200,
          success: true,
          message: '注册成功',
          data: null,
        });
      }
      return res.send({
        success: false,
        message: '请求失败',
      });
    });
  },
};
