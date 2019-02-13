/**
 * @description 用户表数据模型层
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2019-02-13
 */

import helper from '../utils/helper';

/* 用户模块 构造方法*/
const Users = function (users) {
  this.props = users.props;
};

Users.prototype.doLogin = function (params, callback) {
  console.log(params);
  const sql = `select * from baseinfo_user where user_name='${params.userName}' AND password='${params.password}'`;
  helper.doSql({
    sql,
    name: 'doLogin',
    callback,
  });
};

module.exports = Users;
