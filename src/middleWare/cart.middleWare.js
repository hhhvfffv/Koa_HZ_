const { ParameterCartError, notFountIdError, isNullFountError, goodsNumIsNullError } = require('../constant/err.type');
const { selectGoods, selectAllGoods } = require('../service/goods.service');

class CartMiddleWare {
    /**
     * 1.确认必要字段验证，需要传入条件
     * @param {*} ctx 
     * @param {*} next 
     */
    FieldValidation(rules) {
        //判断rules是不是Object类型
        if (!(rules instanceof Object)) return console.log("在字段验证时必须传入对象，里面是验证规则");
        return async (ctx, next) => {
            try {
                ctx.verifyParams(rules)
            } catch (error) {
                console.error(error);
                ParameterCartError.result = error
                return ctx.app.emit('error', ParameterCartError, ctx)
            }
            await next()
        }
    }
    /**
     * 2.确认商品是否存在
     */
    async confirmGoodIdAll(ctx, next) {
        const { goods_id: id } = ctx.request.body
        const res = await selectAllGoods({ id })

        if (!res.length) {
            return ctx.app.emit('error', isNullFountError, ctx)
        }
        await next()
    }
    /**
     * 3.确认商品是否上架
     */
    async confirmGoodId(ctx, next) {
        const { goods_id: id } = ctx.request.body
        const res = await selectGoods({ id })
        if (!res) {
            return ctx.app.emit('error', notFountIdError, ctx)
        }

        await next()
    }

    /**
     * 4.确认商品库存是否充足
     */
    async confirmGoodStock(ctx, next) {
        const { goods_id: id } = ctx.request.body
        try {
            //查询商品信息
            const res = await selectGoods({ id })

            //判断商品库存是否充足
            if (res.goods_num > 0) {
                res.goods_num--
                await res.save()

                await next()
            } else {
                ctx.app.emit('error', goodsNumIsNullError, ctx)
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', goodsNumIsNullError, ctx)
        }
    }
}

module.exports = new CartMiddleWare()   