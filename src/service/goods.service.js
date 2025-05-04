const Goods = require('../model/goods.model');

class GoodsService {
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
}

module.exports = new GoodsService