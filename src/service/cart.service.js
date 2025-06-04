const { Op, where } = require('sequelize');
const Cart = require('../model/cart.model');
const Goods = require('../model/goods.model');

class CartService {
    /**
     * 添加购物车，需要验证
     * @param {*} user_id 
     * @param {*} goods_id 
     * @returns 
     */
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

    /**
     * 查询购物车列表
     */
    async findCart({ pageNum, pageSize }, user_id) {
        //如果没有传入分页参数，则返回所有数据
        if (pageNum == undefined && pageSize == undefined) {
            const { count, rows } = await Cart.findAndCountAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                where: {
                    selected: true,
                    user_id
                },
                include: [{
                    //关联商品信息
                    model: Goods,
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    as: 'goods_info',//别名
                }
                ]
            })
            return { count, rows }
        }

        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            offset,
            limit: +pageSize,
            include: [{
                //关联商品信息
                model: Goods,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                as: 'goods_info',//别名
            }
            ]
        })

        return {
            pageNum,
            pageSize,
            total: count,
            list: rows
        }
    }
    /**
     * 更新购物车信息
     * @param {*} selected 
     */
    async updateCart({ selected, cart_num }, id) {
        const res = await Cart.findByPk(id)//根据id查找购物车信息
        if (!res) return ''

        selected !== undefined ? res.selected = selected : ""
        cart_num !== undefined ? res.cart_num = cart_num : ""

        //保存更新后的信息
        await res.save()
        return res
    }
    /**
     * 删除一个商品
     * @param {*} id
     * 需要一个参数ids数组
     */
    async removeCart(ids) {
        const res = await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids
                }
            },
            force: true
        })

        return res
    }

    /**
     * 全选全不选
     */
    async selectAllOrUn(selected, user_id) {
        const res = await Cart.update({
            selected: selected,
        }, {
            where: {
                user_id
            }
        })
        return res
    }

    /**
     * 返回该用户的购物车总数
     * 
     */
    async getCartCount(user_id) {
        const { count } = await Cart.findAndCountAll({
            where: {
                user_id
            }
        })

        return count
    }

    /**
     * 清空购物车
     */
    async clearCart_(user_id) {
        const res = await Cart.destroy({
            where: {
                user_id
            }
        })

        return res
    }
}

module.exports = new CartService()