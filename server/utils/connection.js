/**
 * @description 数据库配置文件
 * @author NaiyingZhang <fnine59@163.com>
 * @date 2018-12-24
 */

import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '19970628',
  database: 'supply_chain',
});

const db = {};

/**
 * 从数据库连接池中获取数据库连接的方法
 */
db.conn = function (callback) {
  pool.getConnection((err, connection) => {
    console.log('connect start...');
    if (err) {
      throw err;
    } else if (typeof callback === 'function') {
      callback(connection);
    }
    connection.release(); // 释放连接
    console.log('connect end...');
  });
};

module.exports = db;
