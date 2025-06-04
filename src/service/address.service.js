const { where } = require('sequelize');
const Address = require('../model/address.model')

class AddressService {

    /**
     * isdefault设置默认值
     * 需要用户id和地址id，和默认地址
     *  return { count, rows }
     */
    async setDefault(user_id, id, isdefault) {
        //先全部变成不选
        await Address.update(
            { isdefault: false },
            {
                where: {
                    user_id
                }
            }
        )

        //再设置默认地址
        await Address.update(
            { isdefault },
            {
                where: {
                    id,
                    user_id
                }
            }
        )
    }
    /**
     * 查询参数是否存在 和 分页查询
     * 参数对象{ id, user_id, consignee, Telephone, address, isdefault }，pageSize, pageNum
     */
    async selectAddr({ id, user_id, consignee, Telephone, address, isdefault }, pageSize, pageNum) {
        const whereObj = {}

        id && Object.assign(whereObj, { id })
        user_id && Object.assign(whereObj, { user_id })
        consignee && Object.assign(whereObj, { consignee })
        Telephone && Object.assign(whereObj, { Telephone })
        address && Object.assign(whereObj, { address })
        isdefault !== undefined && Object.assign(whereObj, { isdefault })

        //查询
        if (pageSize === undefined && pageNum == undefined) {
            const { count, rows } = await Address.findAndCountAll({
                where: whereObj
            })
            return { count, rows }
        } else {
            //分页查询
            const { count, rows } = await Address.findAndCountAll({
                where: whereObj,
                offset: (pageNum - 1) * pageSize,
                limit: +pageSize
            })
            return { count, rows }
        }
    }

    /*

    }

    /**
     * 创建地址，需要参数 对象
     * { consignee, Telephone, address, user_id,isdefault }
     * @param {*} address 
     * @returns 
     */
    async createAddr({ consignee, Telephone, address, user_id, isdefault }) {
        //判断用户的地址总数是否超过20
        const count = await Address.count({ where: { user_id } })
        if (count >= 20) {
            return 0
        }

        //创建
        const res = await Address.create({ consignee, Telephone, address, user_id })

        //设置默认地址
        if (isdefault !== undefined) {
            const isdefault_ = new AddressService
            isdefault_.setDefault(user_id, res.id, isdefault)
        }

        //返回
        res.isdefault = isdefault
        return res
    }
    /**
     * 更新地址列表
     * 需要  { user_id, id, consignee, Telephone, address, isdefault }
     */
    async updateAddr({ user_id, id, consignee, Telephone, address, isdefault }) {
        const update_obj = {}

        consignee && Object.assign(update_obj, { consignee })
        Telephone && Object.assign(update_obj, { Telephone })
        address && Object.assign(update_obj, { address })

        //更新地址
        let res = await Address.update(update_obj, {
            where: {
                id,
                user_id
            }
        })



        //设置默认地址
        if (isdefault !== undefined) {
            const isdefault_ = new AddressService
            await isdefault_.setDefault(user_id, id, isdefault)
            res.isdefault = isdefault
        }

        return res
    }

    /**
     * 删除一个地址
     * removeAddr(id)
     */
    async removeAddr(id) {
        const res = await Address.destroy({
            where: {
                id
            }
        })

        return res
    }
}

module.exports = new AddressService;