const { findIdError } = require("../constant/err.type");
const { selectAddr } = require("../service/address.service");



class addressMiddleware {
    /**
     * 检查id是否存在
     * @param {*} ctx 
     * @param {*} next 
     * @returns 
     */
    async findIsTure(ctx, next) {

        //不允许一个也不传入
        if ((ctx.request.body == undefined || Object.keys(ctx.request.body).length === 0) && ctx.request.method == 'PUT') {
            return ctx.body = "请至少传入一个参数";
        }



        //验证地址id是否真正存在
        const { id } = ctx.params;
        try {
            const res = await selectAddr({ id, user_id: ctx.state.user.id });
            if (res.count === 0) {
                return ctx.body = {
                    code: 400,
                    message: "地址不存在",
                    result: null
                }
            } else {
                await next();
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', findIdError, ctx);
        }
    }
}

module.exports = new addressMiddleware;