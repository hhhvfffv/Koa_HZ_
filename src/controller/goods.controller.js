const { creteGoods, updateGoods, removeGoods, restoreGoods, PageQueryGoods } = require('../service/goods.service')
const { createGoodsError, updateGoodsError, notFoundIdError, removeGoodsError, repeatedRemovalError, resultIsEmpty, restoreGoodsError, repeatedRestoreError, selectPageGoodsError } = require('../constant/err.type')
class GoodsController {
    async upload(ctx) {
        /**
         * 1.获取上传文件
         * 2.返回给请求端，用于回显
         */
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

    /**
     * 2.创建一条商品信息记录
     * @param {*} ctx 
     * @returns 
     */
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
            return ctx.app.emit('error', createGoodsError, ctx)
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
            return ctx.app.emit('error', updateGoodsError, ctx)
        }

    }
    /**
     * 软删除数据库下架商品
     * @param {*} ctx 
     */
    async remove(ctx) {
        let { id } = ctx.params
        let upload_user = ctx.state.user.user_name//获取当前登录用户

        try {
            const res = await removeGoods(id, upload_user)
            //查看是否有删除记录
            if (res.isRemove) {
                ctx.body = {
                    code: 0,
                    message: '下架成功',
                    result: {
                        user: upload_user,
                        user_change: res.user ? `新管理员${upload_user}执行了下架` : `原管理员${upload_user}执行了下架`
                    }
                }
            } else {
                ctx.app.emit('error', repeatedRemovalError, ctx)
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", removeGoodsError, ctx)
        }
    }
    /**
     * 商品上架操作
     * @param {*} ctx 
     */
    async restore(ctx) {
        let { id } = ctx.params
        let upload_user = ctx.state.user.user_name//获取当前登录用户
        try {
            const res = await restoreGoods(id, upload_user)
            //查看是否有恢复记录
            if (res.isRestore) {
                ctx.body = {
                    code: 0,
                    message: '上架成功',
                    result: {
                        user: upload_user,
                        user_change: res.user ? `新管理员${upload_user}执行了上架` : `原管理员${upload_user}执行了上架`
                    }
                }
            } else {
                ctx.app.emit('error', repeatedRestoreError, ctx)
            }

        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", restoreGoodsError, ctx)
        }
    }
    /**
     * 1.分页查询
     */
    async selectAllGoods(ctx) {
        const { pagenum = 1, pagesize = 10 } = ctx.query  //获取分页参数
        try {
            const res = await PageQueryGoods({ pagenum, pagesize })
            // if (res.list.length <= 0) return ctx.app.emit("error", resultIsEmpty, ctx)
            ctx.body = {
                code: 0,
                message: '查询成功',
                result: res
            }
        } catch (error) {
            console.error(error);
            return ctx.app.emit("error", selectPageGoodsError, ctx)
        }

    }
}
module.exports = new GoodsController();