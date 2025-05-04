
/**
 * 1.用户账户输入有空值
 */
const isUserHaveNull = {
    code: "10001",
    message: "用户账户输入用户名或密码有空值",
    result: ""
}

/**
 * 与数据库有重复
 */
const isUserRepeat = {
    code: "10002",
    message: "用户账户已存在",
    result: ""
}

/**
 * 
 */
const userRegisterError = {
    code: '10003',
    message: '服务器的土豆服务器or土豆mysql出现异常，或者不小心大了一堆符号',
    result: ''
}

const isUserNotExist = {
    code: '10004',
    message: '用户账户不存在',
    result: ''
}
const isDataSlectError = {
    code: '10005',
    message: '数据查询失败',
    result: ''
}

const isPasswordError = {
    code: '10006',
    message: '密码错误',
    result: ''
}
const TokenExpiredError = {
    code: '10007',
    message: 'token过期',
    result: ''
}

const JsonWebTokenError = {
    code: '10008',
    message: 'token无效',
    result: ''
}

const NotBeforeError = {
    code: '10009',
    message: 'token还未激活',
    result: ''
}

//导出
module.exports = {
    isUserHaveNull, // 用户账户输入有空值
    isUserRepeat,   // 与数据库有重复
    userRegisterError, // 用户注册失败
    isUserNotExist,// 用户账户不存在
    isDataSlectError, // 数据查询失败
    isPasswordError, // 密码错误
    TokenExpiredError, // token过期
    JsonWebTokenError, // token无效
    NotBeforeError // token还未激活
}