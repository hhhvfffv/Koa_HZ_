class UserRouteClass {
    async register(ctx, next) {
        ctx.body = ctx.request.body
    }
}

//导出
module.exports = new UserRouteClass()