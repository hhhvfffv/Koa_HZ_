const { addCart, findCart, updateCart, removeCart, selectAllOrUn, getCartCount } = require('../service/cart.service')
const { isAddCartError, isFoundPageError, isUpdateCartError, isNullError, isRemooveError, selectAllError } = require('../constant/err.type')

class CartsController {
    /**
     * 1.添加购物车需要以下参数：用户id，商品id
     * 2.服务层需要校验参数，并操作数据库
     * @param {*} ctx 
     */
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
            return ctx.app.emit('error', isAddCartError, ctx)
        }

    }
    /**
     *2.查询购物车列表
     *参数：ctx.query :pageSize, pageNum
     *返回：购物车列表{
     pageSizes,
     pageNum,
     total,
     list:[]
     }
     */
    async findAll(ctx, next) {
        const { pageSize = 10, pageNum = 1 } = ctx.query
        try {
            //2.操作数据库
            const res = await findCart({ pageNum, pageSize })
            ctx.body = {
                code: 0,
                message: '查询成功',
                user: ctx.state.user,
                result: res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', isFoundPageError, ctx)
        }
    }
    /**
     * 1.更新商品选择和数量
     */
    async update(ctx) {
        //两种不能同时为空
        if (ctx.request.body == undefined) {
            return ctx.app.emit('error', isNullError, ctx)
        } else if (ctx.request.body.selected == undefined && ctx.request.body.cart_num == undefined) {
            return ctx.app.emit('error', isNullError, ctx)
        }
        //1.获取参数[两个参数不能同时为空]
        const { id } = ctx.params
        const { selected, cart_num } = ctx.request.body

        try {
            //2.操作数据库
            const res = await updateCart({ selected, cart_num }, id)
            ctx.body = {
                code: 0,
                message: '更新成功',
                result: res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', isUpdateCartError, ctx)
        }
    }

    /**
     * 删除购物车的一个选项需要一个数组
     */
    async remove(ctx) {
        //1.获取参数
        const { ids } = ctx.request.body

        try {
            //2.操作数据库
            const res = await removeCart(ids)

            //3.返回结果
            ctx.body = {
                code: 0,
                message: res ? '删除成功' : '删除失败',
                result: res ? `影响行数${res}` : ''
            }
        } catch (error) {
            console.log(error);
            return ctx.app.emit('error', isRemooveError, ctx)
        }
    }
    /**
     * 全选
     */
    async selectAll(ctx) {
        //创建用户
        const { id: user_id } = ctx.state.user
        const selected = true
        try {
            //操作数据库
            const res = await selectAllOrUn(selected, user_id)
            ctx.body = {
                code: 0,
                message: '全选成功',
                result: res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit('error', selectAllError, ctx)
        }
    }
    /**
     * 取消全选
     */
    async unselectAll(ctx) {
        //创建用户
        const { id: user_id } = ctx.state.user
        const selected = false
        const res = await selectAllOrUn(selected, user_id)
        ctx.body = {
            code: 0,
            message: '取消全选成功',
            result: res
        }
        try {
            //操作数据库
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', selectAllError, ctx)
        }
    }
    async total(ctx) {
        const user_id = ctx.state.user.id
        try {
            const res = await getCartCount(user_id)
            ctx.body = {
                code: 0,
                message: '获取购物车总数成功',
                result: {
                    count: res,
                    user: ctx.state.user
                }
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', selectAllError, ctx)
        }
    }
}

module.exports = new CartsController();