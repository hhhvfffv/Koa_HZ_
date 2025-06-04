const Router = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { FieldValidation, confirmGoodIdAll, confirmGoodId } = require('../middleWare/cart.middleWare')

const { create, createByGoods } = require('../controller/order.controller');
const { dbSelect, createOrder, clearCart, cancelOrder } = require('../middleWare/order.middleWare');


const router = new Router({ prefix: '/orders' });

/**
 * 通过购物车创建订单
 * @param {Object} ctx 
 * @param {Object} next 
 */
router.post('/crete', getUserTokenInfo, FieldValidation(
    {
        address_id: { type: 'number', required: true, allowEmpty: false, message: '地址id不能为空' },
    }
), dbSelect, clearCart, create, cancelOrder(5000, 4))

/**
 * 通过直接购买创建订单
 * 参数{
    "address_id":8,
    "goods_id":6,
    "num":5
}
 */
router.post('/crete/direct', getUserTokenInfo,
    FieldValidation(
        {
            address_id: { type: 'number', required: true, allowEmpty: false, message: '地址id不能为空' },
            goods_id: { type: 'number', required: true, allowEmpty: false, message: '商品id不能为空' },
            num: { type: 'number', required: true, allowEmpty: false, message: '商品数量不能为空' }
        }),
    confirmGoodIdAll,
    confirmGoodId, createOrder, createByGoods, cancelOrder(10000, 4))

module.exports = router;