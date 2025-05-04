class ErrorHandler {
    async allError(err, ctx) {
        ctx.status = 500;
        switch (err.code) {
            case '10001':
                ctx.status = 401;
                break
            case '10002':
                ctx.status = 403;
                break
            default:
                ctx.status = 500;
                break
        }

        ctx.body = err
    }
}

module.exports = new ErrorHandler();