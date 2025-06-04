const { createAddressError, pageSelectError, removeAddressError } = require("../constant/err.type");
const { createAddr, updateAddr, selectAddr, removeAddr } = require("../service/address.service");

class AddressController {

    /**
     * 1.添加一个地址
     * 要求参数：{名字，电话，地址}
     */
    async crete(ctx) {
        const { id: user_id } = ctx.state.user;
        const { consignee, Telephone, address, isdefault } = ctx.request.body;

        //操作数据库
        try {
            const res = await createAddr({ consignee, Telephone, address, user_id, isdefault });

            //返回
            ctx.body = {
                code: 0,
                message: res ? "添加成功" : "添加失败",
                result: res ? res : "地址数量达到上限"
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', createAddressError, ctx);
        }
    }

    /**
     * 2.修改一个地址
     * 需要参数{ consignee, Telephone, address, isdefault }  ctx.request.body
     * 需要参数{ id } ctx.params
     *  参数id: user_id } = ctx.state.user;
     */
    async update(ctx) {
        //解析参数
        const { id: user_id } = ctx.state.user;
        const { consignee, Telephone, address, isdefault } = ctx.request.body;
        const { id } = ctx.params;

        //操作数据库
        try {
            const res = await updateAddr({ user_id, id, consignee, Telephone, address, isdefault });
            //返回

            ctx.body = {
                code: 0,
                message: res[0] || res.isdefault === isdefault ? "修改成功" : "修改失败",
                result: res[0] ? `更新成功影响行数${res[0]}` : res.isdefault === isdefault ? "修改默认成功" : "不可抵达"
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', createAddressError, ctx);
        }
    }

    /**
     * 分页查询
     * 需要参数
     * query：{
     * pageSize,pageNum}
     */
    async findAll(ctx) {
        //解析参数
        const { pageSize = 10, pageNum = 1 } = ctx.query;
        const { id: user_id } = ctx.state.user;

        //操作数据库
        try {
            const res = await selectAddr({ user_id }, pageSize, pageNum);
            //返回
            ctx.body = {
                code: 0,
                message: "查询成功",
                result: res
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', pageSelectError, ctx);
        }
    }

    /**
     * 删除一个地址
     */
    async remove(ctx) {
        //解析参数
        const { id } = ctx.params;

        try {
            // 操作数据库
            const res = await removeAddr(id);

            ctx.body = {
                code: 0,
                message: res ? "删除成功" : "删除失败",
                result: res
            }
        } catch (error) {
            console.error(error);
            ctx.app.emit('error', removeAddressError, ctx);
        }
    }
}

module.exports = new AddressController;