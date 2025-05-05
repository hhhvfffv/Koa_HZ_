const { ParameterError, selectGoodsError, DuplicateProductError, notFoundIdError } = require('../constant/err.type')
const { selectGoods, selectAllGoods } = require('../service/goods.service')
class GoodsMiddleware {
    /**
     * 1.检测是否有必要字段
     * @param {*} ctx 
     * @param {*} next 
     * @returns 
     */
    async checkField(ctx, next) {
        try {
            ctx.verifyParams({
                goods_name: { type: 'string', required: true },
                goods_price: { type: 'number', required: true },
                goods_num: { type: 'number', required: true },
                goods_img: { type: 'string', required: true }
            })
        } catch (err) {
            ParameterError.result = err
            return ctx.app.emit('error', ParameterError, ctx)
        }

        await next()
    }

    /**
     * 1. 检查商品是否重复
     * 2.需要request.body.goods_name
     * @param {*} ctx 
     * @param {*} next 
     * @returns 
     */
    async EnsureNoPuplication(ctx, next) {
        const { goods_name } = ctx.request.body
        try {
            const res = await selectGoods({ goods_name })
            if (res) {
                return ctx.app.emit('error', DuplicateProductError, ctx)
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', selectGoodsError, ctx)
        }


        await next()
    }
    /**
     * 检查这个id的记录是否存在
     */
    async productExist(ctx, next) {
        const { id } = ctx.params
        try {
            //返回一条记录，有就代表存在
            const res = await selectAllGoods({ id })
            if (res.length === 0) {
                return ctx.app.emit('error', notFoundIdError, ctx)
            }
        } catch (error) {
            console.error(error)
            return ctx.app.emit('error', selectGoodsError, ctx)
        }
        await next()
    }
}

module.exports = new GoodsMiddleware();