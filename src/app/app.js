const Koa = require('koa');
const router = require('../router/user.route')
const { koaBody } = require('koa-body')
const { allError } = require('./errHandler')

const app = new Koa();

//中间件
app.use(koaBody())
app.use(router.routes())
app.on('error', allError)

//导出
module.exports = app;