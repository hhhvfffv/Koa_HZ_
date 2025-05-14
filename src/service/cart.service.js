const { Op } = require('sequelize');
const Cart = require('../model/cart.model')

class CartService {
    async addCart(user_id, goods_id) {
        const res_ = await Cart.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: {
                [Op.and]: { user_id, goods_id }
            }
        })
        if (!res_) {
            const res = await Cart.create({
                goods_id,
                user_id,
            })
            return res
        }
        else {
            await res_.increment('cart_num')
            return await res_.reload({
                //排除字段
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            })
        }
    }
}

module.exports = new CartService()