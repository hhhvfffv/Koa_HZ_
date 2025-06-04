const { createOrderMiddleWareError, clearCartError, createGoodOrderError, cancelOrderError } = require("../constant/err.type");
const { selectAddr } = require("../service/address.service");
const { findCart, clearCart_ } = require("../service/cart.service");
const { selectGoods } = require("../service/goods.service");
const { cancelOrder_ } = require("../service/order.server");
let TimeId = null

class orderMiddleWare {
    /**
     * //检查地址id是否存在
    //查询他的购物车
    //计算总价
    会将goods_info total 挂载到ctx.state中
     * @param {*} ctx 
     * @param {*} next 
     */
    async dbSelect(ctx, next) {
        const user_id = ctx.state.user.id
        try {
            //1.查询他的购物车
            const res = await findCart({}, user_id)

            if (res.count === 0) {
                ctx.body = {
                    code: 1,
                    message: '购物车为空'
                }
                return;
            }

            //2订单相关信息 需要信息cart_number
            const cart_info = res.rows.map(item => {
                //将购物车的数量等挂载到商品信息 以便于计算总价
                item.dataValues.goods_info.dataValues.cart_id = item.dataValues.id
                item.dataValues.goods_info.dataValues.cart_num = item.dataValues.cart_num
                return item.dataValues
            })

            /**
             * 查询商品信息 需要参数 goods_price 
             * 是一个数组 每一个索引需要 goods_price
             */
            const goods_info = cart_info.map(item => {
                return item.goods_info.dataValues
            })

            ctx.state.goods_info = goods_info;


            //3.计算总价
            let total = 0

            if (res.rows.length > 0) {
                goods_info.map(element => {
                    total += element.goods_price * element.cart_num;
                });
            } else {
                return ctx.body = {
                    code: 1,
                    message: '购物车为空,无法计算总价'
                }
            }

            //.将总价挂载
            ctx.state.total = total;
            console.log('总价：', ctx.state.total);



            await next();
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', createOrderMiddleWareError, ctx)
        }
    }

    /**
     * 清空该用户的购物车
     */
    async clearCart(ctx, next) {
        const { id: user_id } = ctx.state.user
        try {
            const res = await clearCart_(user_id)
            console.log(`清空购物车成功，删除了${res}条数据`);

            await next()
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', clearCartError, ctx)
        }
    }

    /**
     * 根据商品创建订单
     * 将需要的数据挂载到 ctx.state里面
     * 
     */
    async createOrder(ctx, next) {
        const { id, num } = ctx.request.body;

        try {
            //1.查询该商品
            const res = await selectGoods({ id })

            //2.把商品信息good_info 挂载到 ctx.state
            res.cart_num = num
            ctx.state.goods_info = JSON.stringify(res);

            //3.通过查询的信息计算total值
            ctx.state.total = res.goods_price * num;

            await next();
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', createGoodOrderError, ctx)
        }
    }

    /**
     * 取消订单
     * 使用条件订单要挂载到 ctx.state
     * 需要传入时间，状态
     */
    cancelOrder(time, state) {
        return (ctx, next) => {
            const { order_number } = ctx.state
            try {
                //1.取消订单  操作数据库 改变订单状态
                TimeId = setTimeout(cancelOrder_(state, order_number), time)
                next()
            } catch (error) {
                console.error(error);
                ctx.app.emit('error', cancelOrderError, ctx)
            }
        }
    }
}

module.exports = new orderMiddleWare();