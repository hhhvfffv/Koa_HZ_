class ErrorHandler {
    async allError(err, ctx) {
        console.log(err);
    }
}

module.exports = new ErrorHandler();