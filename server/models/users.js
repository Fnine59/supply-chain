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
  const sql = `select * from baseinfo_user where user_name='${
    params.username
  }' AND password='${params.password}'`;
  helper.doSql({
    sql,
    name: 'doLogin',
    callback,
  });
};

Users.prototype.doRegister = function (params, callback) {
  const sql = 'INSERT INTO baseinfo_user(user_name,password,nickname) VALUES(?,?,?)';
  const sqlParams = [params.username, params.password, params.nickname];
  helper.doSql({
    sql,
    params: sqlParams,
    name: 'doRegister',
    callback,
  });
};

module.exports = Users;
