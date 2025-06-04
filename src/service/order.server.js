const Order = require('../model/order.model')
const { selectGoods } = require('./goods.service')
class OrderService {
    /**
     * 新建订单
     * @param {Object} param0 - 订单信息
     * @returns 
     */
    async creteOrder({ user_id, goods_id, address_id, goods_info, total, order_number, state }) {
        const obj = {}

        user_id && (obj.user_id = user_id)
        goods_id && (obj.goods_id = goods_id)
        address_id && (obj.address_id = address_id)
        goods_info && (obj.goods_info = goods_info)
        total && (obj.total = total)
        order_number && (obj.order_number = order_number)
        state && (obj.state = state)

        if (goods_id) {
            const res = await Order.create(obj)
            return res
        } else {
            // 通过购物车创建订单
            const res = await Order.create(obj)
            return res
        }
    }

    /**
     * 需要传入订单号 和状态
     * @param {Number} state - 订单状态
     * @param {String} order_number - 订单号
     */
    cancelOrder_(state, order_number) {
        //settimeout要传入一个函数
        return async () => {
            const res = await Order.update({
                state
            }, {
                where: {
                    order_number
                }
            })

            console.log(`取消订单成功,${order_number},${res}条数据`);
        }
    }
}
module.exports = new OrderService()