/**
 * @description 后端用工具模块
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2018-12-24
 */

import crypto from 'crypto';
import db from './connection';

const helper = {
  // 执行sql语句
  doSql(opt) {
    db.conn((connection) => {
      console.log(`request method: ${opt.name}`);
      connection.query(opt.sql, (err, res) => {
        if (err) {
          console.log(`request method ${opt.name} err: + ${err}`);
        } else {
          console.log(`request method ${opt.name} success!`);
          if (typeof opt.callback === 'function') {
            opt.callback(err, res);
          }
        }
      });
    });
  },

  // 获取本地时间字符串
  getTimeString(date) {
    return `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
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
