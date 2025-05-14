const seq = require('../db/seq')
const Goods = require('./goods.model')
const { DataTypes } = require('sequelize');

const Carts = seq.define('zs_carts', {
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品id'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 1,
        comment: '是否选中'
    },
    cart_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品选中数量',
        defaultValue: 1
    }

}, {
    freezeTableName: true,
    paranoid: true,
})

Carts.belongsTo(Goods, {
    foreignKey: 'goods_id',//Carts模型有一个外键字段goods_id，这个字段引用Goods模型的主键。
    as: "goods_info"
})
// Carts.sync({ force: true });

module.exports = Carts