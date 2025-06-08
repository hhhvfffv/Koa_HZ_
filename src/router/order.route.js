const Router = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { FieldValidation, confirmGoodIdAll, confirmGoodId } = require('../middleWare/cart.middleWare')

const { create, createByGoods, findAll } = require('../controller/order.controller');
const { dbSelect, createOrder, clearCart, cancelOrder } = require('../middleWare/order.middleWare');
const { checkInfo } = require('../ruterExpand/order. Expand');


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
    confirmGoodId, createOrder, createByGoods, cancelOrder(4000, 4))


/**
 * 查询订单列表
 * pageSize,pageNumbwr,state
 */
router.get('/', getUserTokenInfo, checkInfo({
    pageSize: { required: true, allowEmpty: false, message: 'pageSize不能为空' },
    pageNumber: {
        required: true, allowEmpty: false, message: 'pageNumber不能为空', validator: (pageNumber) => {
            if (pageNumber <= 2) return false;
            return true;
        }
    },
}), findAll)

module.exports = router;