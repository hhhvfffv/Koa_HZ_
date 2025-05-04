const { DataTypes } = require('sequelize');
const seq = require('../db/seq');
const User = seq.define('zs_users', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '',
        comment: '创建用户用户不可重复'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '用户密码'
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否是管理员 0:不是 1:是'
    },
},
    {
        freezeTableName: true,
    })


//创建实例
// try {
//     User.sync({ force: true });
//     console.log('创建成功');

// } catch (err) {
//     console.log("err");
// }

//暴露
module.exports = User;