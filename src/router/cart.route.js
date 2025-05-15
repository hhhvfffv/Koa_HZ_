const koaRouter = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { add, findAll, update } = require('../controller/carts.controller')
const { FieldValidation, confirmGoodId, confirmGoodIdAll } = require('../middleWare/cart.middleWare')

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
    add
)

/**
 * @api {get} /carts/list 获取购物车列表
 */
router.get('/', getUserTokenInfo, findAll)


router.patch('/:id', getUserTokenInfo, FieldValidation({
    selected: { type: 'boolean', required: false },
    cart_num: { type: 'number', required: false },
}), update)

module.exports = router;