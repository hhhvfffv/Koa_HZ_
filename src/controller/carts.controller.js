const { addCart } = require('../service/cart.service')
const { isAddCartError } = require('../constant/err.type')

class CartsController {
    async add(ctx) {
        const { id: user_id } = ctx.state.user
        const { goods_id } = ctx.request.body

        try {
            //操作数据库
            const res = await addCart(user_id, goods_id)
            ctx.body = {
                code: 0,
                message: '添加成功',
                result: res
            }
        } catch (error) {
            ctx.app.emit('error', isAddCartError, ctx)
        }

    }
}

module.exports = new CartsController();