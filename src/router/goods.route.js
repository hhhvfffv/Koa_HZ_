const Router = require('koa-router');
const { getUserTokenInfo, isAdmain } = require('../middleWare/auth.middleWare')
const { upload, create, update, remove, restore, selectAllGoods } = require('../controller/goods.controller')
const { checkField, EnsureNoPuplication, productExist } = require('../middleWare/goods.middleWare')

const router = new Router({ prefix: '/goods' });

//上传图片
router.post('/upload', getUserTokenInfo, isAdmain, upload)

//发布商品
router.post('/', getUserTokenInfo, isAdmain, checkField, EnsureNoPuplication, create)

//修改商品信息
router.put('/:id', getUserTokenInfo, isAdmain, checkField, EnsureNoPuplication, update)

//下架商品
router.put("/:id/off", getUserTokenInfo, isAdmain, productExist, remove)

//上架商品
router.put("/:id/on", getUserTokenInfo, isAdmain, productExist, restore)

//分页查询
router.get('/', selectAllGoods)
module.exports = router;