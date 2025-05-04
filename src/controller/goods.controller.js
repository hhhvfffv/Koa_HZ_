const { creteGoods } = require('../service/goods.service')
const { createGoodsError } = require('../constant/err.type')
class GoodsController {
    async upload(ctx) {
        const file = ctx.request.files.file
        //判断是否为数组
        if (file instanceof Array) {
            ctx.body = {
                code: 0,
                message: '上传成功',
                reslut: {
                    img_url: file.map(item => item.newFilename)
                }
            }
        } else {
            ctx.body = {
                code: 0,
                message: '上传成功',
                reslut: file.newFilename
            }
        }
    }

    async create(ctx) {
        const dataCreate = ctx.request.body;
        const upload_user = ctx.state.user.user_name
        Object.assign(dataCreate, { upload_user })//合并对象

        try {
            const res = await creteGoods(dataCreate)
            ctx.body = {
                code: 0,
                message: '创建成功',
                result: res
            }
        } catch (err) {
            console.error(err);
            ctx.app.emit('error', createGoodsError, ctx)
        }
    }
}

module.exports = new GoodsController();