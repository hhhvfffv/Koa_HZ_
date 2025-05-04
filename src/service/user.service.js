const { where } = require('sequelize')
const User = require('../model/user.model')

// 1.创建用户
const createUser = async (user_name, password, isAdmin = 0) => {
    try {
        const res = await User.create({ user_name, password, isAdmin })
        return res.dataValues
    } catch (err) {
        console.error(err)
        console.error('添加用户失败');
    }
}

//2.用户查询
const getUser = async ({ user_name, id, isAdmin, createAt, updatedAt }) => {
    const where = {}

    //条件加入
    user_name ? Object.assign(where, { user_name }) : null
    id ? Object.assign(where, { id }) : null
    isAdmin ? Object.assign(where, { isAdmin }) : null
    createAt ? Object.assign(where, { createAt }) : null
    updatedAt ? Object.assign(where, { updatedAt }) : null

    //查询
    try {
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'isAdmin', 'createdAt', 'updatedAt'],
            where: where
        })
        return res ? res.dataValues : null
    } catch (err) {
        console.error(err)
        console.error('查询错误');
    }

}

//3.用户条件更新
const updateUser = async ({ id, user_name, password, isAdmin }) => {
    //要更新的内容
    const updateData = {}
    //条件  一般都是按id
    const WhereOpj = { id }

    //要改的内容
    user_name ? Object.assign(updateData, { user_name }) : null
    password ? Object.assign(updateData, { password }) : null
    isAdmin ? Object.assign(updateData, { isAdmin }) : null


    const res = await User.update(
        updateData, //更新内容
        {
            where: WhereOpj
        }
    )

    return res[0] //返回更新的条数
}





module.exports = {
    createUser, // 1.创建用户
    getUser,    //2.用户查询
    updateUser //3.用户条件更新
}