const { findIdError } = require("../constant/err.type");
const { selectAddr } = require("../service/address.service");

class _UniversalMiddleWare {
    /**
     * 1.验证地址是否存在 
     * 2.传入参数布尔，为真就是验证query参数，为假就是验证body参数
     * 3.结构参数address_id
     * @param {*} ctx 
     * @param {*} next 
     */
    Address_comfir(num) {
        // 地址验证中间件
        return async (ctx, next) => {
            const isADDID = num ? ctx.query : ctx.request.body;

            // 验证地址id是否存在
            const id = isADDID.address_id // 地址id
            const { id: user_id } = ctx.state.user; // 用户id

            try {
                //操作数据库
                const res = await selectAddr({ id, user_id })
                console.log(res);

                if (res.count == 0) {
                    return ctx.app.emit('error', findIdError, ctx)
                }
            } catch (error) {
                console.error(error);
                findIdError.result = "数据库查询错误"
                return ctx.app.emit('error', findIdError, ctx)
            }

            await next();
        }
    }
}

module.exports = new _UniversalMiddleWare;