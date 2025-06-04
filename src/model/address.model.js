const { DataTypes } = require('sequelize');
const seq = require('../db/seq')

const Address = seq.define('address', {
    consignee: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人名字'
    },

    Telephone: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货人电话号码'
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '收货地址'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    isdefault: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否默认地址'
    }

}, {
    freezeTableName: true,
})
//创建表
// Address.sync({ force: true })

module.exports = Address