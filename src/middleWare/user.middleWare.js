const { isUserRepeat, isUserHaveNull, userRegisterError, isUserNotExist, isDataSlectError, isPasswordError } = require('../constant/err.type')
const { getUser } = require('../service/user.service')
const bcrypt = require('bcryptjs')


const isUserEmpty = async (ctx, next) => {
    /**
     * 验证用户是否为空
     * @param {Object} ctx 请求上下文对象
     * @param {Function} next 回调函数
     */
    const { user_name, password } = ctx.request.body;
    if (!user_name || !password) {
        ctx.body = "不能为空"
        ctx.app.emit('error', isUserHaveNull, ctx)
        return
    }
    await next()
}

/**userRegisterError
 * 2.查重处理
 */
const isUserDuplicate = async (ctx, next) => {
    const { user_name } = ctx.request.body;
    // 数据库查询用户是否存在
    try {
        if (await getUser({ user_name })) {
            ctx.body = "用户名已存在"
            return
        }
        ctx.app.emit('error', isUserRepeat, ctx)
    } catch (err) {
        console.error(err);
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next()
}

//3.用户密码加密
const encryptPassword = async (ctx, next) => {
    try {
        let password
        switch (ctx.URL.pathname) {
            //修改密码
            case '/user/password':
                password = ctx.request.body.newPassword
                break
            default:
                password = ctx.request.body.password
                break
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        //挂载回去
        ctx.request.body.password = hash;

    } catch (err) {
        console.error(err);
    }

    await next()
}

//4.用户合法性验证
const isUserLegal = async (ctx, next) => {
    //1.获得数据
    const { user_name } = ctx.request.body;
    //2.查找用户是否存在
    try {
        if (!await getUser({ user_name })) {
            ctx.app.emit('error', isUserNotExist, ctx)
            return
        }
    } catch (err) {
        console.error(err);
        ctx.app.emit('error', isDataSlectError, ctx)
        return
    }


    await next()
}

//5.密码验证
const isPasswordCorrect = async (ctx, next) => {
    try {
        //1.获得数据
        const { password, user_name } = ctx.request.body;
        //2.获得数据库用户信息  
        const User_infomation = await getUser({ user_name });
        console.log(User_infomation.password);
        console.log(password);


        //3.解密
        if (!bcrypt.compareSync(password, User_infomation.password)) {
            ctx.app.emit('error', isPasswordError, ctx)
            console.log(bcrypt.compareSync(password, User_infomation.password));
            return
        }
    } catch (err) {
        console.error(err);
        ctx.app.emit('error', isDataSlectError, ctx)
        return
    }


    await next()
}



module.exports = {
    isUserEmpty,    // 验证用户是否为空
    isUserDuplicate,// 验证用户是否重复
    encryptPassword,//3.用户密码加密
    isUserLegal,    //4.用户合法性验证
    isPasswordCorrect //5.密码验证

}