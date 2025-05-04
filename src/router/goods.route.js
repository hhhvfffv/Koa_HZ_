const Router = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare')
const { isAdmain } = require('../middleWare/auth.middleWare')
const { upload, create } = require('../controller/goods.controller')
const { checkField, EnsureNoPuplication } = require('../middleWare/goods.middleWare')

const router = new Router({ prefix: '/goods' });

//上传图片
router.post('/upload', getUserTokenInfo, isAdmain, upload)

//发布商品
router.post('/', getUserTokenInfo, isAdmain, checkField, EnsureNoPuplication, create)


module.exports = router;