const Address = require('../model/address.model')
const Order = require('../model/order.model')
const User = require('../model/user.model')
class OrderService {
    /**
     * 新建订单
     * @param {Object} param0 - 订单信息
     * @returns 
     */
    async creteOrder({ user_id, goods_id, address_id, goods_info, total, order_number, state }) {
        const obj = {}

        user_id && (obj.user_id = user_id)
        goods_id && (obj.goods_id = goods_id)
        address_id && (obj.address_id = address_id)
        goods_info && (obj.goods_info = goods_info)
        total && (obj.total = total)
        order_number && (obj.order_number = order_number)
        state && (obj.state = state)

        if (goods_id) {
            const res = await Order.create(obj)
            return res
        } else {
            // 通过购物车创建订单
            const res = await Order.create(obj)
            return res
        }
    }

    /**
     * 需要传入订单号 和状态
     * @param {Number} state - 订单状态
     * @param {String} order_number - 订单号
     */
    async cancelOrder_(state, order_number) {
        //settimeout要传入一个函数
        const res = await Order.update({
            state
        }, {
            where: {
                order_number
            }
        })

        console.log(`取消订单成功,${order_number},改变${res}条数据`);
        return res
    }

    /**
     * { pageSize, pageNum, state }, user_id
     * @param {*} param0 
     * @param {*} user_id 
     * @returns 
     */
    async findAllOrder_({ pageSize, pageNum, state }, user_id) {
        console.log(pageSize, pageNum, state, user_id);

        //需要要求的参数，通过user_id获取
        //需要对应的地址id  和地址详细参数
        //user_id对应的用户名字
        const offset = (pageNum - 1) * pageSize;
        const { rows, count } = await Order.findAndCountAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },//不返回字段
            offset,
            limit: +pageSize,
            where: { state, user_id },
            include: [{ //外键关联模型一
                model: Address,
                as: 'address_info',//别名{也就是返回的数据的名字}
                //会自动查询关联字段的对应记录
                attributes: { exclude: ['createdAt', 'updatedAt', 'user_id', 'isdefault'] },
            }, { //外键关联模型二
                model: User,
                as: 'user_info',//别名{也就是返回的数据的名字}
                attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'isAdmin'] },
            }]
        })


        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }

    /**
     * 更新订单
     */
    async updateOrder({ order_number, state, address_id, user_id }) {
        const res = await Order.update({
            state,
            address_id,
        }, {
            where: {
                user_id,
                order_number,
            }
        })

        return res
    }
}
module.exports = new OrderService()