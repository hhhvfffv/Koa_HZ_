const Router = require('koa-router');
const { register } = require('../controller/user.controller')
const { isUserEmpty, isUserDuplicate } = require('../middleWare/user.middleWare')

const router = new Router({ prefix: '/user' });

router.post('/register', isUserEmpty, isUserDuplicate, register)

module.exports = router