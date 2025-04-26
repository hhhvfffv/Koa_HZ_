const { isUserRepeat, isUserHaveNull } = require('../constant/err.type')

const isUserEmpty = async (ctx, next) => {
    /**
     * 验证用户是否为空
     * @param {Object} ctx 请求上下文对象
     * @param {Function} next 回调函数
     */
    const { user_name, password } = ctx.request.body;
    if (!user_name || !password) {
        ctx.body = "不能为空"
        ctx.app.emit('error', isUserHaveNull, ctx)
        return
    }
    next()
}

/**
 * 
 */
const isUserDuplicate = async (ctx, next) => {
    const { user_name } = ctx.request.body;
    // 数据库查询用户是否存在
    try {
        if (true) {
            ctx.body = "用户名已存在"
        }
        return
    } catch (err) {
        console.error(err);
        ctx.app.emit('error', isUserRepeat, ctx)
        return
    }
    next()
}

module.exports = {
    isUserEmpty,// 验证用户是否为空
    isUserDuplicate// 验证用户是否重复
}