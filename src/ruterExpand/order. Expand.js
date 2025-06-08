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

    /**
     * 检查需要信息是否存在
     *  rulesObj对象
     * validator 自定义验证函数 要有返回值  rulesObj{验证:{validator：（）=》（）
     * }}
     */
    checkInfo(rulesObj) {
        return async (ctx, next) => {
            //确认数据源
            let source = ctx.query
            let errors = []

            //确定rulesObj是不是对象
            if (!rulesObj || typeof rulesObj !== 'object') {
                return console.log('rulesObj不是对象,或者没有传入必要参数');
            }

            //通过Object的entries方法遍历rulesObj
            for (let [key, rules] of Object.entries(rulesObj)) {

                //判断规则是不是对象
                if (!rules || typeof rules !== 'object') {
                    return console.error(`${key}的rules不是对象,或者没有传入必要参数`);
                }

                //拿value值
                let value = source[key] //等于ctx.query.key
                let messageError = ""//错误信息
                let isNext = true//是否继续执行下一个规则

                //必要性required
                if (rules.required && (value === undefined
                    || value === null
                    || value === ""
                )) {
                    isNext = false
                    messageError = rules.message || `${key}不能为空`
                }

                //验证参数是否为空
                if (isNext || rules.allowEmpty == false) {
                    if (value == '' || (typeof value === 'string' && value.trim() === '')) {
                        isNext = false
                        messageError = rules.message || `${key}不能为空值`
                    }
                }

                //类型验证
                if (isNext && rules.type) {
                    const type = rules.type.toLowerCase()
                    const typeOfValue = typeof value
                    //特殊类型
                    if (type === 'number' && isNaN(Number(value))) {
                        isNext = false
                        messageError = `${key}必须是数字`
                    }

                    //其他类型
                    if (isNext || type !== typeOfValue) {
                        isNext = false
                        messageError = `${key}必须是${rules.type}`
                    }
                }

                //自定义验证函数
                if (isNext && typeof rules.validator === 'function') {
                    const isTrue = await rules.validator(value)
                    if (!isTrue) {
                        isNext = false
                        messageError = rules.message + `（）=》` + `自定义验证函数验证失败`
                    }
                }

                if (!isNext) {
                    errors.push({
                        key,
                        message: messageError
                    })
                }
            }

            console.log(errors);


            //如果有错误，抛出错误
            if (errors.length > 0) {
                return ctx.body = {
                    code: 4,
                    message: errors
                }
            }

            await next()
        }
    }
}


module.exports = new orderExpand();