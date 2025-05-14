const koaRouter = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { add } = require('../controller/carts.controller')
const { FieldValidation, confirmGoodId, confirmGoodIdAll } = require('../middleWare/cart.middleWare')

const router = new koaRouter({ prefix: '/carts' });

//路由
router.post('/add',
    getUserTokenInfo,
    FieldValidation({
        goods_id: { type: 'number', required: true },
    }),
    confirmGoodIdAll,
    confirmGoodId,
    add
)


module.exports = router;