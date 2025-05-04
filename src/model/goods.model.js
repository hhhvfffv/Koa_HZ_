const seq = require('../db/seq')
const { DataTypes } = require('sequelize');

const Goods = seq.define('zs_goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称'
    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '商品价格'
    },
    goods_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '商品库存'
    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片URL地址'
    },
    upload_user: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "上传的管理员"
    }

}, {
    freezeTableName: true,
    paranoid: true,
})

// Goods.sync({ force: true });
console.log("执行一次");


module.exports = Goods