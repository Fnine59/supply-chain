/**
 * @description 后端用工具模块
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2018-12-24
 */

import crypto from 'crypto';
import async from 'async';
import db from './connection';

const helper = {
  // 执行sql语句
  doSql(opt) {
    db.conn((connection) => {
      console.log(`request method: ${opt.name}`);
      if (!opt.params) {
        // 执行查询/删除语句
        connection.query(opt.sql, (err, res) => {
          if (err) {
            console.log(`request method ${opt.name} err: + ${err}`);
            if (typeof opt.callback === 'function') {
              opt.callback(err);
            }
          } else {
            console.log(`request method ${opt.name} success!`);
            if (typeof opt.callback === 'function') {
              opt.callback(err, res);
            }
          }
        });
        return;
      }
      // 执行新增/插入语句
      connection.query(opt.sql, opt.params, (err, res) => {
        if (err) {
          console.log(`request method ${opt.name} err: + ${err}`);
          if (typeof opt.callback === 'function') {
            opt.callback(err);
          }
        } else {
          console.log(`request method ${opt.name} success!`);
          if (typeof opt.callback === 'function') {
            opt.callback(err, res);
          }
        }
      });
    });
  },

  // 执行多条sql语句
  doSqls(opt) {
    db.multiConn((connection) => {
      console.log(`request method: ${opt.name}`);
      if (!opt.params) {
        // 执行查询/删除语句
        connection.query(opt.sql, (err, res) => {
          if (err) {
            console.log(`request method ${opt.name} err: + ${err}`);
            if (typeof opt.callback === 'function') {
              opt.callback(err);
            }
          } else {
            console.log(`request method ${opt.name} success!`);
            if (typeof opt.callback === 'function') {
              opt.callback(err, res);
            }
          }
        });
        return;
      }
      // 执行新增/插入语句
      connection.query(opt.sql, opt.params, (err, res) => {
        if (err) {
          console.log(`request method ${opt.name} err: + ${err}`);
          if (typeof opt.callback === 'function') {
            opt.callback(err);
          }
        } else {
          console.log(`request method ${opt.name} success!`);
          if (typeof opt.callback === 'function') {
            opt.callback(err, res);
          }
        }
      });
    });
  },

  // 初始化sql
  getNewSqlParamEntity(sql, params, callback) {
    if (callback) {
      return callback(null, {
        sql,
        params,
      });
    }
    return {
      sql,
      params,
    };
  },

  // 执行事务
  execTrans(sqlparamsEntities, callback) {
    db.multiConn((connection) => {
      connection.beginTransaction((err) => {
        if (err) {
          return callback(err, null);
        }
        console.log(
          `开始执行transaction，共执行${sqlparamsEntities.length}条数据`,
        );
        const funcAry = [];
        sqlparamsEntities.forEach((sqlParam) => {
          const temp = function (cb) {
            const sql = sqlParam.sql;
            const param = sqlParam.params;
            console.log('执行sql', sql);
            console.log('执行param', param);
            connection.query(sql, param, (tErr, rows, fields) => {
              if (tErr) {
                connection.rollback(() => {
                  console.log(`事务失败，${sqlParam}，ERROR：${tErr}`);
                  throw tErr;
                });
              } else {
                return cb(null, 'ok');
              }
            });
          };
          funcAry.push(temp);
        });

        async.series(funcAry, (err, result) => {
          console.log(`transaction error: ${err}`);
          if (err) {
            connection.rollback((err) => {
              console.log(`transaction error: ${err}`);
              connection.release();
              return callback(err, null);
            });
          } else {
            connection.commit((err, info) => {
              console.log(`transaction info: ${JSON.stringify(info)}`);
              if (err) {
                console.log(`执行事务失败，${err}`);
                connection.rollback((err) => {
                  console.log(`transaction error: ${err}`);
                  connection.release();
                  return callback(err, null);
                });
              } else {
                connection.release();
                return callback(null, info);
              }
            });
          }
        });
      });
    });
  },

  // 获取本地时间字符串
  getTimeString(date) {
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  },

  // 获取本地日期字符串
  getDateString(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },

  // MD5加密
  getMD5(str) {
    const md5 = crypto.createHash('md5');
    md5.update(str);
    return md5.digest('hex');
  },

  // HTML片段转义
  htmlEncode(str) {
    let s = '';
    if (str.length === 0) {
      return '';
    }
    s = str.replace(/&/g, '&amp;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/ /g, '&nbsp;');
    s = s.replace(/'/g, '&#39;');
    s = s.replace(/"/g, '&quot;');
    s = s.replace(/\n/g, '<br>');
    return s;
  },

  // HTML片段反转义
  htmlDecode(str) {
    let s = '';
    if (str.length === 0) {
      return '';
    }
    s = str.replace(/&amp;/g, '&');
    s = s.replace(/&lt;/g, '<');
    s = s.replace(/&gt;/g, '>');
    s = s.replace(/&nbsp;/g, ' ');
    s = s.replace(/&#39;/g, "'");
    s = s.replace(/&quot;/g, '"');
    s = s.replace(/<br>/g, '\n');
    return s;
  },

  // 反处理URL
  deParseURL(url) {
    return url.replace(/\*/g, '&');
  },
};

module.exports = helper;
