const { Sequelize } = require('sequelize');
const { DATA_BASE, DB_USER, DB_PASSWORD, DB_HOST } = require('../config/config.default')

let sql;
//连接数据库
try {
    sql = new Sequelize(DATA_BASE, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'mysql',
    })
} catch (err) {
    console.error(err);
    console.error('连接数据库失败');
}

//导出
module.exports = sql