const seq = require('../db/seq')
const { DataTypes } = require('sequelize');
const Goods = require('./goods.model');
const Address = require('./address.model');

const Order = seq.define('zd_orders', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '商品id,为单独买准备'
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '地址id'
    },
    goods_info: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '商品信息'
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: '总金额'
    },
    order_number: {
        type: DataTypes.CHAR(50),
        allowNull: false,
        comment: '订单号'
    },
    state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '订单状态(0:未支付，1:已支付，2:已发货，3:已收货，4:取消)'
    }

},
    {
        freezeTableName: true,
    })

//建立了了两个外键，一个是goods_id，一个是address_id
Order.belongsTo(Goods, {
    foreignKey: 'goods_id',
    as: 'good_info'
})
Order.belongsTo(Address, {
    foreignKey: 'address_id',
    as: 'address_info'
})

// Order.sync({ force: true });//创建表/
console.log('执行一次');

module.exports = Order;


