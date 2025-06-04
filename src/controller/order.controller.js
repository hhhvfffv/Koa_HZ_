const { createOrderError } = require('../constant/err.type')
const { creteOrder } = require('../service/order.server')

class orderController {
    /**
     * 根据购物车创建订单
     * @param {*} ctx 
     */
    async create(ctx, next) {
        const { id: user_id } = ctx.state.user
        const { address_id } = ctx.request.body
        let { goods_info, total } = ctx.state
        const order_number = Date.now() + Math.floor(Math.random() * 1000) //生成订单号
        ctx.state.order_number = order_number//方便取消订单


        //将goods_info转化为字符串
        goods_info = JSON.stringify(goods_info) //数据库只接收字符串
        const state = 0 //订单状态 0:未支付
        try {
            //操作数据库
            const res = await creteOrder({ user_id, address_id, goods_info, total, order_number, state })
            res.goods_info = JSON.parse(res.goods_info) //将goods_info转化为对象
            //返回数据
            ctx.body = {
                code: 0,
                message: '订单创建成功',
                res
            }

            await next() //下一步中间件， 定义取消订单
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', createOrderError, ctx)
        }
    }

    /**
     * 根据商品创建订单
     * 需要参数 ctx.body = { goods_id, address_id ,num}
     */
    async createByGoods(ctx, next) {
        const { id: user_id } = ctx.state.user
        const { address_id, goods_id } = ctx.request.body
        const order_number = Date.now() + Math.floor(Math.random() * 1000) //生成订单号
        const total = ctx.state.total
        const goods_info = ctx.state.goods_info
        const state = 0 //订单状态 0:未支付 
        ctx.state.order_number = order_number//方便取消订单

        try {
            //操作数据库
            const res = await creteOrder({ user_id, goods_id, address_id, goods_info, total, order_number, state })
            res.goods_info = JSON.parse(res.goods_info) //将goods_info转化为对象

            //返回数据
            ctx.body = {
                code: 0,
                message: '订单创建成功',
                res
            }

            await next() //下一步中间件， 定义取消订单
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', createOrderError, ctx)

        }
    }
}

module.exports = new orderController()