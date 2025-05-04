const { createUser } = require('../service/user.service')
const jwt = require('jsonwebtoken')
const { isDataSlectError } = require('../constant/err.type')
const { JOSN_WEB_TOKEN, JOSN_DATA } = require('../config/config.default')
const { getUser, updateUser } = require('../service/user.service')

class UserRouteClass {

    //注册
    async register(ctx, next) {
        const { user_name, password, isAdmin = 0 } = ctx.request.body
        try {
            const res = await createUser(user_name, password, isAdmin)
            ctx.body = {
                code: "0",
                message: "注册成功",
                result: {
                    id: res.id,
                    user_name: res.user_name,
                    isAdmin: res.isAdmin,
                }
            }

        } catch (e) {
            console.error("操作数据库错误");
            return
        }
    }

    //登录
    async login(ctx, next) {

        //返回token
        try {
            const { user_name } = ctx.request.body
            let token;
            const { password, createdAt, updatedAt, ...res } = await getUser({ user_name })
            token = jwt.sign(res, JOSN_WEB_TOKEN, { expiresIn: JOSN_DATA })
            //返回数据
            ctx.body = {
                code: "0",
                message: "登录成功",
                result: {
                    token,
                    user_name: res.user_name,
                    isAdmin: res.isAdmin,
                }
            }
        } catch (e) {
            console.error(e, "操作数据库错误或者token生成错误");
            ctx.app.emit('error', isDataSlectError, ctx)
            return
        }


    }

    //改密码
    async changPassword(ctx, next) {
        // 更改
        const { id } = ctx.state.user
        const { password } = ctx.request.body

        try {
            //操作数据库
            await updateUser({ id, password })
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', isDataSlectError, ctx)
            return
        }

        ctx.body = {
            code: "0",
            message: "修改密码成功",
        }
    }
}



//导出
module.exports = new UserRouteClass()