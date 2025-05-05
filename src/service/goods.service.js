const { where } = require('sequelize');
const Goods = require('../model/goods.model');

class GoodsService {
    /**
     * 查询商品信息
     * @param {*} param0 
     * @returns 
     */
    async selectGoods({ goods_name, goods_price, goods_num, goods_img, upload_user }) {
        const whereOpj = {}

        goods_name && Object.assign(whereOpj, { goods_name });
        goods_price && Object.assign(whereOpj, { goods_price });
        goods_num && Object.assign(whereOpj, { goods_num });
        goods_img && Object.assign(whereOpj, { goods_img });
        upload_user && Object.assign(whereOpj, { upload_user });

        const res = await Goods.findOne({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereOpj,
        })

        return res ? res.dataValues : null;
    }

    /**
     * 创建记录
     * @param {*} param0 
     * @returns 
     */
    async creteGoods({ goods_name, goods_price, goods_num, goods_img, upload_user }) {
        const createGoods = {}

        goods_name && Object.assign(createGoods, { goods_name });
        goods_price && Object.assign(createGoods, { goods_price });
        goods_num && Object.assign(createGoods, { goods_num });
        goods_img && Object.assign(createGoods, { goods_img });
        upload_user && Object.assign(createGoods, { upload_user });

        const res = await Goods.create(createGoods)

        return res;
    }

    /**
     * 更新记录 需要一个数组  和一个id
     * @param {*} param0 
     * @returns 
     */
    async updateGoods({ goods_name, goods_price, goods_num, goods_img, upload_user }, id) {
        const updateDate = {}

        goods_name && Object.assign(updateDate, { goods_name });
        goods_price && Object.assign(updateDate, { goods_price });
        goods_num && Object.assign(updateDate, { goods_num });
        goods_img && Object.assign(updateDate, { goods_img });
        upload_user && Object.assign(updateDate, { upload_user });

        const res = await Goods.update(
            updateDate,
            {
                where: { id }
            }
        )

        return res[0] ? true : false;
    }
}

module.exports = new GoodsService