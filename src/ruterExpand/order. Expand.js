const { cancelOrderMiddleWareError } = require("../constant/err.type");
const { selectGoods } = require("../service/goods.service");
const { cancelOrder_ } = require("../service/order.server");


class orderExpand {
    //取消订单函数的拆分
    /**
     * 返回仓库的商品
     * 需要参数（state, order_number, ctx）
     * @param {*} state 
     * @param {*} order_number 
     * @param {*} param2 
     * @returns 
     */
    cancelOrderMid(state, order_number, ctx) {
        return async () => {
            try {
                //调用取消订单函数
                await cancelOrder_(state, order_number)

                //把库存放回去
                //2.把用户占有的库存释放
                if (ctx.url === '/orders/crete/direct') {
                    let { goods_id: id, num } = ctx.request.body
                    console.log('/orders/crete/direct');
                    //直接购买的订单，直接把库存放回去
                    const goods_info = await selectGoods({ id })
                    //更新
                    goods_info.goods_num += num
                    await goods_info.save()//更新库存
                    console.log(`库存商品id:${id},返回数量${num},现在数量${goods_info.goods_num},此订单取消成功`);


                } else if (ctx.url === '/orders/crete') {
                    console.log('/orders/crete');
                    //购物车购买的订单，把库存放回去
                    let { goods_info } = ctx.state

                    //更新库存
                    const goods_change_list = goods_info.map((item) => {
                        //返回需要的依据
                        // 更新数据库需要goods_id和goods_num
                        return {
                            id: item.id,
                            goods_num: item.cart_num
                        }
                    })
                    console.log("需要取消订单并返回仓库的商品：");
                    console.log(goods_change_list);


                    //循环请求数据库更新
                    for (let i = 0; i < goods_change_list.length; i++) {
                        //结构出需要的数据
                        const { id, goods_num } = goods_change_list[i]
                        //请求数据库
                        const goods_db = await selectGoods({ id })
                        //更新库存
                        goods_db.goods_num += goods_num
                        //保存
                        await goods_db.save()//更新库存
                        console.log(`库存商品id:${id},返回数量${goods_num},现在数量${goods_db.goods_num},此订单取消成功`);
                    }

                } else {
                    console.log('else');
                }
            } catch (error) {
                console.error(error);
                ctx.app.emit('error', cancelOrderMiddleWareError, ctx)
            }

        }
    }
}


module.exports = new orderExpand();