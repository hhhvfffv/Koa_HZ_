const { createOrderError, notFindeOrderInfoError } = require('../constant/err.type')
const { creteOrder, findAllOrder_, updateOrder } = require('../service/order.server')

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

    /**
     * 查询订单列表
     * query参数
     */
    async findAll(ctx, next) {
        const { pageNum, pageSize, state } = ctx.query
        const { id: user_id } = ctx.state.user

        //操作数据库
        try {
            const res = await findAllOrder_({ pageSize, pageNum, state }, user_id)
            //将goods_info转化为对象
            res.list.forEach(item => {
                item.goods_info = JSON.parse(item.goods_info) //将goods_info转化为对象
            })

            //返回数据
            ctx.body = {
                code: 0,
                message: '查询成功',
                res
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', notFindeOrderInfoError, ctx)
        }
    }

    /**
     * 更新订单状态
     */
    async update(ctx, next) {
        const { order_number, state, address_id } = ctx.request.body
        const { id: user_id } = ctx.state.user

        try {
            const res = await updateOrder({ order_number, state, address_id, user_id })
            //返回数据
            ctx.body = {
                code: 0,
                message: '更新成功',
                res: res[0] ? "更新成功" : "更新失败"
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', notFindeOrderInfoError, ctx)
        }
    }
}

module.exports = new orderController()