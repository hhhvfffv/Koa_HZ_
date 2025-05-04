const { ParameterError, selectGoodsError, DuplicateProductError } = require('../constant/err.type')
const { selectGoods } = require('../service/goods.service')
class GoodsMiddleware {
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

    async EnsureNoPuplication(ctx, next) {
        const { goods_name } = ctx.request.body
        try {
            const res = await selectGoods({ goods_name })
            if (res) {
                return ctx.app.emit('error', DuplicateProductError, ctx)
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', selectGoodsError, ctx)
        }


        await next()
    }
}

module.exports = new GoodsMiddleware();