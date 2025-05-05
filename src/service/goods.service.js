const { where } = require('sequelize');
const Goods = require('../model/goods.model');

class GoodsService {
    /**
     * 查询商品信息
     * @param {*} param0 
     * @returns 
     */
    async selectGoods({ id, goods_name, goods_price, goods_num, goods_img, upload_user }) {
        const whereOpj = {}

        id && Object.assign(whereOpj, { id });
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
     * 1. 查询所有商品信息包括软删除的
     */
    async selectAllGoods({ id, goods_name, goods_price, goods_num, goods_img, upload_user }) {
        const whereOpj = {}

        id && Object.assign(whereOpj, { id });
        goods_name && Object.assign(whereOpj, { goods_name });
        goods_price && Object.assign(whereOpj, { goods_price });
        goods_num && Object.assign(whereOpj, { goods_num });
        goods_img && Object.assign(whereOpj, { goods_img });
        upload_user && Object.assign(whereOpj, { upload_user });


        const res = await Goods.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            where: whereOpj,
            paranoid: false
        })

        return res
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

    /**
     * 软删除记录
     * 需要管理员名字  删除商品id
     */
    async removeGoods(id, upload_user) {
        //软删除操作
        const isRemove = await Goods.destroy({
            where: { id }
        })
        if (!isRemove) {
            return { isRemove }
        }
        //更新操作人
        const ser = new GoodsService()//实例化
        const user = await ser.updateGoods({ upload_user }, id)//更新操作人

        isRemove ? true : false
        return { user, isRemove }
    }
    /**
     * 商品上架
     * @param {*} id 
     * @returns 
     */
    async restoreGoods(id, upload_user) {
        //恢复
        const isRestore = await Goods.restore({
            where: {
                id
            },
        })
        if (!isRestore) {
            //没有返回就是没有恢复成功 或者说 根本没有删除
            return { isRestore }
        }
        const ser = new GoodsService()//实例化
        const user = await ser.updateGoods({ upload_user }, id)//更新操作人

        return { isRestore, user }
    }

    /**
     * 1.商品的分页查询
     */
    async PageQueryGoods({ pagenum, pagesize }) {

        const offset = (pagenum - 1) * pagesize  //偏移量{从第几条开始}

        const { count, rows } = await Goods.findAndCountAll({
            offset, //偏移量
            limit: +pagesize, //每页显示的条数
        })

        return {
            pagenum,
            pagesize,
            total: count,
            list: rows
        }
    }

}

module.exports = new GoodsService