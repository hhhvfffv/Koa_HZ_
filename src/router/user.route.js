const Router = require('koa-router');
const { register, login, changPassword } = require('../controller/user.controller')
const { isUserEmpty, isUserDuplicate, encryptPassword, isUserLegal, isPasswordCorrect } = require('../middleWare/user.middleWare')
const { getUserTokenInfo } = require('../middleWare/auth.middleWare')

const router = new Router({ prefix: '/user' });

//注册
/**
 * 参数 user_name  password
 */
router.post('/register', isUserEmpty, isUserDuplicate, encryptPassword, register)

//登录
/**
 * 参数 user_name  password
 */
router.post('/login', isUserEmpty, isUserLegal, isPasswordCorrect, login)

//修改密码
/**
 *参数 user_name  password  newPassword
 */
router.patch('/password', getUserTokenInfo, isPasswordCorrect, encryptPassword, changPassword)

module.exports = router