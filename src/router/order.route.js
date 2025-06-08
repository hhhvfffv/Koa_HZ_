const Router = require('koa-router');
const { getUserTokenInfo } = require('../middleWare/auth.middleWare');
const { FieldValidation, confirmGoodIdAll, confirmGoodId } = require('../middleWare/cart.middleWare')

const { create, createByGoods, findAll, update } = require('../controller/order.controller');
const { dbSelect, createOrder, clearCart, cancelOrder } = require('../middleWare/order.middleWare');
const { checkInfo } = require('../ruterExpand/order. Expand');
const { Address_comfir } = require('../middleWare/_ Universal.middleWare');


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
), Address_comfir(0), dbSelect, clearCart, create, cancelOrder(90000, 4))

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
    Address_comfir(0),
    confirmGoodIdAll,
    confirmGoodId, createOrder, createByGoods, cancelOrder(90000, 4))


/**
 * 查询订单列表
 * pageSize,pageNumbwr,state
 */
router.get('/', getUserTokenInfo, checkInfo({
    pageSize: { required: true, allowEmpty: false, message: 'pageSize不能为空' },
    pageNum: {
        required: true, allowEmpty: false, message: 'pageNum不能为空，且页数不得小于1', validator: (pageNum) => {
            if (pageNum < 1) return false;
            return true;
        },
    },
    state: {
        required: true, allowEmpty: false, message: 'state不能为空只能为[0,1,2,3,4]订单状态(0:未支付，1:已支付，2:已发货，3:已收货，4:取消)', validator: (state) => {
            if (state != 0
                && state != 1
                && state != 2
                && state != 3
                && state != 4
            ) {
                return false;
            } else {
                return true;
            }

        }
    }
}), findAll)

/**
 * 更新订单状态
 * addream_id,order_number,state
 */
router.put('/update', getUserTokenInfo, checkInfo(
    {
        address_id: { required: true, allowEmpty: false },
        order_number: { required: true, allowEmpty: false },
        state: {
            required: true, allowEmpty: false, message: '状态不能为空', validator: (state) => {
                if (state != 0
                    && state != 1
                    && state != 2
                    && state != 3
                    && state != 4
                ) {
                    return false;
                } else {
                    return true;
                }

            }
        }
    }, 1), Address_comfir(0), update
)

module.exports = router;