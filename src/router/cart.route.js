const koaRouter = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { add, findAll, update, remove, selectAll, unselectAll, total } = require('../controller/carts.controller')
const { FieldValidation, confirmGoodId, confirmGoodIdAll, confirmGoodStock } = require('../middleWare/cart.middleWare')

const router = new koaRouter({ prefix: '/carts' });

//路由
/**
 * @api {post} /carts/add 添加购物车
 */
router.post('/add',
    getUserTokenInfo,
    FieldValidation({
        goods_id: { type: 'number', required: true },
    }),
    confirmGoodIdAll,
    confirmGoodId,
    confirmGoodStock,
    add
)

/**
 * @api {get} /carts/list 获取购物车列表
 */
router.get('/', getUserTokenInfo, findAll)

/**
 * /:id 更新购物车
 */
router.patch('/:id', getUserTokenInfo, FieldValidation({
    selected: { type: 'boolean', required: false },
    cart_num: { type: 'number', required: false },
}), update)

/**
 * 删除，批量删除
 */
router.delete('/', getUserTokenInfo, FieldValidation({
    ids: { type: 'array', required: true },
}), remove)

/**
 * 全选全不选
 */
router.post('/selectAll', getUserTokenInfo, selectAll)
router.post('/unselectAll', getUserTokenInfo, unselectAll)

/**
 * 获取购物车总数
 */
router.get('/total', getUserTokenInfo, total)

module.exports = router;