const { creteGoods, updateGoods } = require('../service/goods.service')
const { createGoodsError, updateGoodsError, notFoundIdError } = require('../constant/err.type')
const { logger } = require('sequelize/lib/utils/logger')
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

    /**
     * 1.更新商品操作数据库
     * 2.返回更新后的商品信息
     * @param {*} ctx 
     */
    async update(ctx) {
        let { id } = ctx.params
        let updateData = ctx.request.body//获取更新数据
        let upload_user = ctx.state.user.user_name//获取当前登录用户
        Object.assign(updateData, { upload_user })//合并对象


        try {
            const res = await updateGoods(updateData, id)//更新商品
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '更新成功',
                    result: ''
                }
            } else {
                ctx.app.emit('error', notFoundIdError, ctx)
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', updateGoodsError, ctx)
        }

    }
}

module.exports = new GoodsController();