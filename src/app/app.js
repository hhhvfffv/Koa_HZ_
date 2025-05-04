const Koa = require('koa');
const { allError } = require('./errHandler')
const koa_body_file = require('./koa_body')
const { koaBody } = require('koa-body')
const parameter = require('koa-parameter');
const koaStatic = require('koa-static')
const fs = require('fs');
const path = require('path');

//路由
const router = require('../router');

const app = new Koa();

//中间件
koa_body_file(app, koaBody, path, fs)
app.use(koaStatic(path.join(__dirname, '../upload')))

app.use(parameter(app)) //校验中间件
app.use(router.routes())
app.use(router.allowedMethods())
app.on('error', allError)

//导出
module.exports = app;