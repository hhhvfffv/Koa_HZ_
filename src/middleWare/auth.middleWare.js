const jwt = require('jsonwebtoken')
const { JOSN_WEB_TOKEN } = require('../config/config.default')
const { TokenExpiredError, JsonWebTokenError, NotBeforeError } = require('../constant/err.type')

class AuthMiddleware {

    //用户的信息提取
    async getUserTokenInfo(ctx, next) {
        //获取   会有私有前缀 要分隔
        const token = ctx.request.header.authorization.split(' ')[1];
        try {
            //验证token
            let user = jwt.verify(token, JOSN_WEB_TOKEN)
            //将用户信息存入ctx.state
            ctx.state.user = user;
        } catch (err) {
            console.error(err);
            switch (err.name) {
                case 'TokenExpiredError':
                    ctx.app.emit('error', TokenExpiredError, ctx)
                    break;
                case 'JsonWebTokenError':
                    ctx.app.emit('error', JsonWebTokenError, ctx)
                    break;
                case 'NotBeforeError':
                    ctx.app.emit('error', NotBeforeError, ctx)
                    break;
                default:
                    ctx.body = {
                        code: 4,
                        message: '出现未捕获错误',
                        result: {
                            err: "去厮后端吧"
                        }
                    }
                    break;
            }

            return
        }

        await next()
    }
}

module.exports = new AuthMiddleware;